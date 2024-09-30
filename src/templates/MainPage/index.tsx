'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'

const MainPage = () => {
  return (
    <>
      <Layout>
        <BlogCard />
        <BlogCard />
      </Layout>
    </>
  )
}

export default MainPage
