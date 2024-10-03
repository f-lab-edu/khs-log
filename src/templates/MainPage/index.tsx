'use client'

import React from 'react'

import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

const MainPage = () => {
  return (
    <>
      <Layout isMainPage>
        <Typography
          text="어서오세요! 👋🏻"
          className="mb-4 h2 md:pr-16 md:h3 font-black text-n-7"
        />
        <Typography
          text="dev-khs, Frontend-Developer 💻"
          className="mb-12 body1 text-n-4 md:mb-6"
        />
      </Layout>
    </>
  )
}

export default MainPage
