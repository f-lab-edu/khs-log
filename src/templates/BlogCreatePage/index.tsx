'use client'

import React from 'react'

import BlogEdit from '@/components/BlogEdit'
import Layout from '@/components/Layout'

const BlogCreatePage = () => {
  return (
    <>
      <Layout isMainView>
        <BlogEdit />
      </Layout>
    </>
  )
}

export default BlogCreatePage
