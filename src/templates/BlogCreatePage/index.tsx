'use client'

import React from 'react'

import Layout from '@/components/Layout'
import MarkdownPreview from '@/components/MarkdownPreview'

const MOCK_DATA = {
  content: `### Hi there 👋
I am \`ivory-code\`, Hansung Kwon! I live in Seoul, South Korea!! And welcome to my GitHub profile!!!

😄 &nbsp;I always find joy in maintaining consistency in learning and growing. Even if it's slow, I never give up.

🔭 &nbsp;I’m currently working at 'MonyMony' and using React Native!

🌱 &nbsp;I’m currently learning JavaScript, React JS, and React Native!

⚡ &nbsp;I’m interested in Web Programming with React JS and App Programming with React Native!`,
}

const BlogCreatePage = () => {
  return (
    <>
      <Layout isMainView>
        <MarkdownPreview markdownBody={MOCK_DATA.content} />
      </Layout>
    </>
  )
}

export default BlogCreatePage
