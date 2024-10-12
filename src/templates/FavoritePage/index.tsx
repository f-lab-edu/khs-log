'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import {type Database} from '@/supabase/database.types'

const FavoritePage = () => {
  const [favoritesData, setFavoritesData] =
    useState<Database['public']['Tables']['favorites']['Row'][]>()

  const fetchFavoritesData = useCallback(async () => {
    const res = await axios(`/api/Favorite`)
    const data = await res.data

    setFavoritesData(data)
  }, [])

  useEffect(() => {
    void fetchFavoritesData()
  }, [fetchFavoritesData])

  return (
    <>
      <Layout>
        <BlogList url="/" />
        <BlogList url="/Blog" />
        <BlogList url="/Favorite" />
      </Layout>
    </>
  )
}

export default FavoritePage
