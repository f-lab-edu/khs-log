'use client'

import {useParams} from 'next/navigation'
import React from 'react'

import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

const BlogDetailPage = () => {
  const params = useParams()

  return (
    <>
      <Layout>
        <Typography text={`${params.id}`} />
      </Layout>
    </>
  )
}

export default BlogDetailPage
