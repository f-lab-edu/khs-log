'use client'

import React, {useCallback, useEffect, useState, useRef} from 'react'

import {getPostsByRange} from '@/app/api/getPosts'
import BlogCard from '@/features/blog/components/BlogCard'
import {type BlogData} from '@/shared/types'
import Layout from '@/widgets/Layout/components'

const LOAD_MORE_COUNT = 2 // 추가로 불러올 데이터 수

interface BlogPageProps {
  initialData?: BlogData[]
}

const BlogPage = ({initialData = []}: BlogPageProps) => {
  // State
  const [blogsData, setBlogsData] = useState<BlogData[]>(initialData)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const observerRef = useRef<HTMLDivElement | null>(null)

  // Load more blogs
  const loadMoreBlogs = useCallback(async () => {
    if (!hasMore) return

    const from = page * LOAD_MORE_COUNT
    const to = from + LOAD_MORE_COUNT - 1
    const moreData = await getPostsByRange(from, to)

    if (moreData) {
      setBlogsData(prevBlogs => [...prevBlogs, ...moreData])
      setPage(prevPage => prevPage + 1)
    } else {
      setHasMore(false)
    }
  }, [hasMore, page])

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreBlogs()
        }
      },
      {threshold: 0.5},
    )

    const currentObserverRef = observerRef.current

    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreBlogs, hasMore])

  if (blogsData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No posts available. Please try again later.
      </div>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
        {/* Loading skeletons */}
        {blogsData.map((data, index) => (
          <BlogCard
            key={`blog-${data.id}-${index}`}
            id={data.id}
            title={data.title}
            imageUrl={data.titleImageUrl}
            content={data.content}
          />
        ))}
      </div>
      {/* Intersection Observer Trigger */}
      {hasMore && <div ref={observerRef} className="h-10" />}
    </Layout>
  )
}

export default BlogPage
