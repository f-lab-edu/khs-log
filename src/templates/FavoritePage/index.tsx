'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const FavoritePage = () => {
  return (
    <>
      <Layout>
        <BlogCard url="/" />
        <BlogCard url="/" />
      </Layout>
    </>
  )
}

export default FavoritePage
