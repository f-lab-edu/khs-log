'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import {type Database} from '@/supabase/database.types'

const BlogDashBoardPage = () => {
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])

  const fetchBlogsData = useCallback(async () => {
    const res = await axios(`/api/BlogDashBoard`)
    const data = await res.data.blogsData

    setBlogsData(data)
  }, [])

  useEffect(() => {
    void fetchBlogsData()
  }, [fetchBlogsData])

  return (
    <>
      <Layout>
        {blogsData.length > 0
          ? blogsData.map(data => (
              <BlogList
                key={`${data.id}`}
                url={`/BlogDetail/${data.id}`}
                title={data.title}
              />
            ))
          : null}
      </Layout>
    </>
  )
}

export default BlogDashBoardPage
