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

const SKILLS = [
  {name: 'javascript', bg: 'bg-accent-6'},
  {name: 'react', bg: 'bg-accent-7'},
  {name: 'nextjs', bg: 'bg-n-2'},
  {name: 'graphql', bg: 'bg-accent-8'},
]

const TOOLS = [
  {name: 'github', bg: 'bg-n-2'},
  {name: 'googleAnalytics', bg: 'bg-accent-9'},
  {name: 'firebase', bg: 'bg-accent-10'},
  {name: 'figma', bg: 'bg-accent-11'},
]

const EditProfilePage = () => {
  const user = useUser(state => state.user)

  const [profileData, setProfileData] =
    useState<Database['public']['Tables']['profile']['Row']>()

  const [mainTitle, setMainTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value)
    }

  const fetchProfileData = useCallback(async () => {
    try {
      const res = await axios(`/api/EditProfile`)
      const data = await res.data.profileData[0]
      setProfileData(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  const handleSaveProfile = useCallback(async () => {
    const profilePayload = {
      role: user?.role ?? '',
      contents: content,
      mainTitle: mainTitle,
      subTitle: subTitle,
      skills: SKILLS,
      tools: TOOLS,
    }

    const data = profileData
      ? await editProfile(profilePayload)
      : await createProfile(profilePayload)

    if (data) {
      setProfileData(data)
    }
  }, [content, mainTitle, profileData, subTitle, user?.role])

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
                type="submit"
                onClick={handleSaveProfile}
                className="border border-gray-300">
                <Typography text="홈 수정" className="base2" />
              </Button>
            </Link>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">제목</h2>
            <Input
              value={mainTitle}
              onChange={handleChange(setMainTitle)}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">부제목</h2>
            <Input
              value={subTitle}
              onChange={handleChange(setSubTitle)}
              className={
                'w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              }
            />
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">내용</h2>
            <Textarea
              value={content}
              onChange={handleChange(setContent)}
              className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditProfilePage
