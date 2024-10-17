'use client'

import axios from 'axios'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'

import Icon, {type IconName} from '@/components/Icon'
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import Typography from '@/components/Typography'
import {type Database} from '@/supabase/database.types'

interface IconProps {
  name: IconName
  bg: string
}

const IconRow = ({icons, title}: {icons: IconProps[]; title: string}) => (
  <div className="mt-6">
    <Typography text={title} className="base2" />
    <div className="flex justify-start gap-x-5">
      {icons.map(icon => (
        <div
          key={icon.name}
          className={`w-12 h-12 rounded ${icon.bg} flex justify-center items-center`}>
          <Icon iconName={icon.name} />
        </div>
      ))}
    </div>
  </div>
)

const MainPage = () => {
  const [profileData, setProfileData] =
    useState<Database['public']['Tables']['profile']['Row']>()

  const hasSkills = profileData !== undefined && profileData.skills !== null
  const hasTools = profileData !== undefined && profileData.tools !== null

  const skillsIcons = profileData?.skills as unknown as IconProps[]

  const toolsIcons = profileData?.tools as unknown as IconProps[]

  const fetchProfileData = useCallback(async () => {
    const res = await axios(`/api/EditProfile`)
    const data = await res.data.profileData[0]

    setProfileData(data)
  }, [])

  useEffect(() => {
    void fetchProfileData()
  }, [fetchProfileData])

  return (
    <>
      <Layout isMainView>
        <LoginForm className="flex justify-end items-center h-18 mb-6 selection:border-b border-n-3" />
        <Typography
          text={profileData?.mainTitle ?? ''}
          className="mb-4 h2 md:h3 font-black text-n-7"
        />
        <Typography
          text={profileData?.subTitle ?? ''}
          className="mb-12 body1 text-n-4 md:mb-6"
        />
        <div className="flex py-8 border-t border-n-3 lg:block md:py-8 dark:border-n-5">
          <div className="shrink-0 w-[21rem] pr-20 2xl:w-72 2xl:pr-12 lg:w-full lg:mb-10 lg:pr-0">
            <Typography
              text={profileData?.contents ?? ''}
              className="mt-4 base2 text-n-4 whitespace-pre-line"
            />
            {hasSkills && <IconRow icons={skillsIcons} title="Skills" />}
            {hasTools && <IconRow icons={toolsIcons} title="Tools" />}
          </div>
          <div className="grow">
            <Image
              className="w-full h-[500px] object-cover rounded-3xl md:rounded-xl"
              src="/images/avatar.png"
              alt="avatar"
              width={600}
              height={500}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MainPage
