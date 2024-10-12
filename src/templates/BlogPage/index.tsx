'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import {getBlogsFavorites} from '@/app/api/getFavorites'
import BlogCard from '@/components/BlogCard'
import Layout from '@/components/Layout'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

const BlogPage = () => {
  const user = useUser(state => state.user)

  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][] | null
  >()
  const [favoritesData, setFavoritesData] =
    useState<Database['public']['Tables']['favorites']['Row'][]>()

  const fetchBlogsData = useCallback(async () => {
    const res = await axios(`/api/Blog`)
    const data = await res.data

    setBlogsData(data.posts)
  }, [])

  const fetchFavoritesData = useCallback(async () => {
    if (!user?.id) {
      return
    }
    const data = await getBlogsFavorites({userId: user.id})

    setFavoritesData(data)
  }, [user?.id])

  useEffect(() => {
    void fetchBlogsData()

    void fetchFavoritesData()
  }, [fetchBlogsData, fetchFavoritesData])

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
          {blogsData?.map((data, index) => (
            <BlogCard
              key={index}
              id={data.id}
              title={data.title}
              imageUrl={data.titleImageUrl}
              content={data.content}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage
