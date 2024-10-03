'use client'

import {useParams} from 'next/navigation'
import React, {Suspense, useEffect, useState} from 'react'

import Image from '@/components/Image'
import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

interface Blog {
  id: number
  title: string
  content: string
  image: string
}

const BlogDetailPage = () => {
  const params = useParams()
  const [blogs, setBlogs] = useState<Blog[]>([])

  const selectedBlog = blogs.find(blog => blog.id === Number(params.id))

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/BlogDetail')
      const data: Blog[] = await response.json()
      setBlogs(data)
    }

    void fetchBlogs()
  }, [])

  return (
    <Layout>
      <Suspense fallback={<Typography text="Loading..." />}>
        {selectedBlog && (
          <>
            <div className="relative w-full aspect-[1]">
              <Image
                className="rounded-xl object-cover"
                src={selectedBlog.image}
                fill
                alt="blogDetailImage"
                priority
              />
            </div>
            <div>
              <Typography text={selectedBlog.title} />
              <Typography text={selectedBlog.content} />
            </div>
          </>
        )}
      </Suspense>
    </Layout>
  )
}

export default BlogDetailPage
