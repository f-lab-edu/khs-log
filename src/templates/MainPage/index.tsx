'use client'

import React from 'react'

import BlogCard from '@/components/BlogCard'
import LeftSideBar from '@/components/LeftSideBar'
import RightCommentBar from '@/components/RightCommentBar'

const MainPage = () => {
  return (
    <>
      <LeftSideBar />
      <BlogCard />
      <RightCommentBar />
    </>
  )
}

export default MainPage
