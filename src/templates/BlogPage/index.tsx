'use client'

import React, {useEffect, useState, useRef, useCallback} from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'

const INITIAL_PAGE_COUNT = 6 // 처음에 불러올 데이터 수
const LOAD_MORE_COUNT = 2 // 추가로 불러올 데이터 수

const BlogPage = () => {
  const supabase = createBrowserClient()

  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [hasMore, setHasMore] = useState(true) // 더 불러올 데이터가 있는지 여부
  const [page, setPage] = useState(1) // 페이지 번호 (초기 로드는 6개이므로 1로 시작)

  const observerRef = useRef<HTMLDivElement | null>(null) // Observer가 감지할 Ref

  // 첫 6개 데이터를 불러오는 함수
  const fetchBlogsData = useCallback(async () => {
    if (isLoading) return // 이미 로딩 중이면 중단

    setIsLoading(true)
    try {
      const res = await supabase
        .from('posts')
        .select('*')
        .order('created_at', {ascending: false})
        .range(0, INITIAL_PAGE_COUNT - 1) // 처음 6개 데이터를 가져오기

      if (res.data && res.data.length > 0) {
        setBlogsData(res.data) // 초기 6개 데이터를 blogsData에 설정
      } else {
        setHasMore(false) // 데이터가 더 이상 없으면 중단
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching initial blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, supabase])

  // 그 이후로 데이터를 2개씩 추가로 불러오는 함수
  const fetchMoreBlogs = useCallback(async () => {
    if (isLoading || !hasMore) return // 이미 로딩 중이거나 더 이상 데이터가 없으면 중단

    setIsLoading(true)
    try {
      const from = page * LOAD_MORE_COUNT // 페이지 번호에 따른 시작점
      const to = from + LOAD_MORE_COUNT - 1 // 2개 데이터를 가져오기

      const res = await supabase
        .from('posts')
        .select('*')
        .order('created_at', {ascending: false})
        .range(from, to)

      if (res.data && res.data.length > 0) {
        // 중복 데이터 확인 후 추가
        setBlogsData(prevBlogs => {
          const newBlogs = res.data.filter(
            blog => !prevBlogs.some(prevBlog => prevBlog.id === blog.id),
          )
          return [...prevBlogs, ...newBlogs] // 중복되지 않는 데이터만 추가
        })
        setPage(prevPage => prevPage + 1) // 페이지 증가
      } else {
        setHasMore(false) // 더 이상 불러올 데이터가 없으면 중단
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching more blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, page, supabase])

  // Intersection Observer로 감지하여 fetchMoreBlogs 호출
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchMoreBlogs() // observer가 감지되면 추가 데이터를 불러오기
        }
      },
      {threshold: 0.5}, // 요소가 50% 화면에 보일 때 트리거
    )

    const currentObserverRef = observerRef.current // 현재 observerRef 값을 변수에 저장

    if (currentObserverRef) {
      observer.observe(currentObserverRef) // 감지할 요소 연결
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef) // 언마운트 시 observer 제거
      }
    }
  }, [fetchMoreBlogs, isLoading, hasMore])

  // 초기 데이터 로드
  useEffect(() => {
    // 페이지 첫 로드 시 초기 데이터 호출 (6개)
    fetchBlogsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
          {blogsData.map((data, index) => (
            <BlogCard
              key={`${data.id}-${index}`}
              id={data.id}
              title={data.title}
              imageUrl={data.titleImageUrl}
              content={data.content}
            />
          ))}
        </div>
        <div ref={observerRef} className="h-10" /> {/* 감지할 빈 요소 */}
        {isLoading && <div>Loading...</div>} {/* 로딩 상태 표시 */}
      </Layout>
    </div>
  )
}

export default BlogPage
