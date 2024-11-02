'use client'

import axios from 'axios'
// 추가하여 재렌더 방지
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'

import IconRow, {type IconsType} from '@/components/IconRow'
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

export type ProfileData = Database['public']['Tables']['profile']['Row']

const MainPage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const fetchProfileData = useCallback(async () => {
    try {
      const {data} = await axios.get<{profileData: ProfileData[]}>(
        '/api/editProfile',
      )

      if (data.profileData[0]) {
        setProfileData(data.profileData[0])
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching profile data:', error)
    }
  }, [])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  return (
    <div>
      <Layout isMainView>
        <LoginForm className="flex justify-end items-center h-10 mb-6 selection:border-b" />
        <Typography
          text={profileData?.mainTitle ?? ''}
          className="mb-4 h2 md:h3 font-black"
        />
        <Typography
          text={profileData?.subTitle ?? ''}
          className="mb-12 body1 text-n-4 md:mb-6"
        />
        <div className="flex py-8 border-t lg:block md:py-8 dark:border-n-5">
          <div className="shrink-0 w-[21rem] lg:w-full lg:mb-10 lg:pr-0">
            <Typography
              text={profileData?.contents ?? ''}
              className="mt-4 base2 text-n-4 whitespace-pre-line"
            />
            <div className="lg:flex lg:justify-around md:flex-col md:justify-normal">
              {profileData?.skills && (
                <IconRow
                  icons={profileData.skills as unknown as IconsType}
                  title="Skills"
                  className="min-w-[160px]"
                />
              )}
              {profileData?.tools && (
                <IconRow
                  icons={profileData?.tools as unknown as IconsType}
                  title="Tools"
                  className="min-w-[160px]"
                />
              )}
            </div>
          </div>
          {profileData?.imageUrl && (
            <div className="grow px-5 justify-center">
              <Image
                className="w-full max-h-[500px] object-cover rounded-3xl md:rounded-xl"
                src={profileData.imageUrl}
                alt="avatar"
                width={580}
                height={500}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default MainPage
