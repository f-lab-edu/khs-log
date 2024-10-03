'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const MOCK_DATA = [
  {
    id: 1,
    title: '1st Title',
    content:
      '1st Content 1st Content 1st Content 1st Content 1st Content 1st Content',
    image: '/images/ogu.webp',
  },
  {
    id: 2,
    title: '2nd 제목',
    content:
      '1st Content 1st Content 1st Content 1st Content 1st Content 1st Content',
    image: '/images/doguri.png',
  },
]

const BlogPage = () => {
  return (
    <>
      <Layout>
        {MOCK_DATA.map((data, index) => (
          <BlogCard
            key={index}
            id={data.id}
            title={data.title}
            content={data.content}
            image={data.image}
          />
        ))}
      </Layout>
    </>
  )
}

export default BlogPage
