'use client'

import axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'

import BlogEdit from '@/components/BlogEdit'
import BlogList from '@/components/BlogList'
import Button from '@/components/Button'
import EditProfile from '@/components/EditProfile'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

const BlogDashBoardPage = () => {
  const [isEditProfileVisible, setEditProfileVisible] = useState(false)
  const [isBlogDetailVisible, setBlogDetailVisible] = useState(false)
  const [blogsData, setBlogsData] = useState<
    Database['public']['Tables']['posts']['Row'][]
  >([])
  const [selectedBlog, setSelectedBlog] = useState<
    Database['public']['Tables']['posts']['Row'] | null
  >(null)

  const handleEditProfile = useCallback(() => {
    setEditProfileVisible(!isEditProfileVisible)
  }, [isEditProfileVisible])

  const handleBlogDetail = useCallback(
    (blog: Database['public']['Tables']['posts']['Row']) => {
      setSelectedBlog(blog)
      setBlogDetailVisible(true)
    },
    [],
  )

  const closeBlogDetailModal = useCallback(() => {
    setBlogDetailVisible(false)
  }, [])

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
        <Button
          onClick={handleEditProfile}
          className="group w-1/2 h-15 flex justify-center items-center m-3 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5">
          <>
            <Icon
              className="relative z-1"
              iconName="blog"
              fill="fill-accent-3"
            />
            <Typography text="홈 추가/수정" className="base2 " />
          </>
        </Button>
        {blogsData.length > 0
          ? blogsData.map(data => (
              <div
                key={`${data.id}`}
                className="flex justify-between items-center">
                <BlogList
                  onClick={() => handleBlogDetail(data)}
                  title={data.title}
                  isAdmin
                />
                <Icon
                  className="ml-4 fill-accent-1 transition-colors items-center"
                  iconName="delete"
                />
              </div>
            ))
          : null}
      </Layout>
      <Modal
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        visible={isEditProfileVisible}
        onClose={handleEditProfile}>
        <EditProfile />
      </Modal>
      {selectedBlog && (
        <Modal
          classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
          visible={isBlogDetailVisible}
          onClose={closeBlogDetailModal}>
          {selectedBlog && <BlogEdit blogData={selectedBlog} />}
        </Modal>
      )}
    </>
  )
}

export default BlogDashBoardPage
