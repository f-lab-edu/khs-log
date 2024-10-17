'use client'

import axios from 'axios'
import Link from 'next/link'
import {useCallback, useEffect, useState} from 'react'

import {createProfile} from '@/app/api/createProfile'
import {editProfile} from '@/app/api/editProfile'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Layout from '@/components/Layout'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {type Database} from '@/supabase/database.types'

import type React from 'react'

const EditProfilePage = () => {
  const user = useUser(state => state.user)

  const [profileData, setProfileData] =
    useState<Database['public']['Tables']['profile']['Row']>()

  const [mainTitle, setMainTitle] = useState(profileData?.mainTitle ?? '')
  const [subTitle, setSubTitle] = useState(profileData?.subTitle ?? '')
  const [content, setContent] = useState(profileData?.contents ?? '')

  const handleMainTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMainTitle(event.target.value)
  }

  const handleSubTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitle(event.target.value)
  }

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value)
  }

  const fetchProfileData = useCallback(async () => {
    const res = await axios(`/api/EditProfile`)
    const data = await res.data.profileData[0]

    setProfileData(data)
  }, [])

  const handleCreateProfile = useCallback(async () => {
    await createProfile({
      role: user?.role ?? '',
      contents: content,
      mainTitle: mainTitle,
      subTitle: subTitle,
      skills: ['github', 'googleAnalytics', 'firebase', 'figma'],
      tools: ['javascript', 'react', 'nextjs', 'graphql'],
    })
  }, [content, mainTitle, subTitle, user?.role])

  const handleEditProfile = useCallback(async () => {
    await editProfile({
      role: user?.role ?? '',
      contents: content,
      mainTitle: mainTitle,
      subTitle: subTitle,
      skills: ['javascript', 'react', 'nextjs', 'graphql'],
      tools: ['github', 'googleAnalytics', 'firebase', 'figma'],
    })
  }, [content, mainTitle, subTitle, user?.role])

  useEffect(() => {
    void fetchProfileData()
  }, [fetchProfileData])

  useEffect(() => {
    if (profileData) {
      setMainTitle(profileData.mainTitle ?? '')
      setSubTitle(profileData.subTitle ?? '')
      setContent(profileData.contents ?? '')
    }
  }, [profileData])

  return (
    <>
      <Layout isMainView>
        <div className="flex flex-col h-screen p-4">
          <div className="flex justify-end items-center h-18">
            <Link href="/">
              <Button
                onClick={profileData ? handleEditProfile : handleCreateProfile}
                className="border border-gray-300">
                <Typography text="홈 수정" className="base2" />
              </Button>
            </Link>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">제목</h2>
            <Input
              value={mainTitle}
              onChange={handleMainTitleChange}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">부제목</h2>
            <Input
              value={subTitle}
              onChange={handleSubTitleChange}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">내용</h2>
            <Textarea
              value={content}
              onChange={handleContentChange}
              className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditProfilePage
