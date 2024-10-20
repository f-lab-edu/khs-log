'use client'

import {useRouter} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'

import {getBlogsFavorites} from '@/app/api/getFavorite'
import BlogList from '@/components/BlogList'
import Layout from '@/components/Layout'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

const FavoritePage = () => {
  const router = useRouter()
  const user = useUser(state => state.user)

  const [favoritesData, setFavoritesData] = useState<
    Database['public']['Tables']['favorites']['Row'][]
  >([])

  const handleRouter = useCallback(
    (id: string) => {
      router.push(`/BlogDetail/${id}`)
    },
    [router],
  )

  const fetchFavoritesData = useCallback(async () => {
    if (!user?.id) {
      return
    }

    const data = await getBlogsFavorites({userId: user.id})

    setFavoritesData(data ?? [])
  }, [user?.id])

  useEffect(() => {
    void fetchFavoritesData()
  }, [fetchFavoritesData])

  return (
    <div>
      <Layout>
        {favoritesData.length > 0
          ? favoritesData.map(data => (
              <div
                key={`${data.id}`}
                className="flex justify-center items-center">
                <BlogList
                  onClick={() => handleRouter(data.post_id ?? '')}
                  title={data.post_title}
                />
              </div>
            ))
          : null}
      </Layout>
    </div>
  )
}

export default FavoritePage
