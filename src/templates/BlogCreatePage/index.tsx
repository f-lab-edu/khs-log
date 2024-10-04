'use client'

import React from 'react'

import Layout from '@/components/Layout'
import Typography from '@/components/Typography'

const BlogCreatePage = () => {
  return (
    <>
      <Layout isMainView>
        <div className="flex py-8 border-t border-n-3 lg:block md:py-8 dark:border-n-5">
          <Typography
            text={`새로 경험한 일들을 상대와 공감하고 공유하는 것을 좋아하며, 표현하는 것을 좋아합니다.

                경험을 통한 과정으로 사용자들에 대한 공감과 소통의 중요성이 증대되는 시대에서, 모두가 공감할 수 있는 UI/UX를 고민하고 서비스를 개발하기 위해 끊임없이 노력하는 FrontEnd 개발자입니다.
                
                사용자들의 경험을 듣고, 코드로 공감시킬 수 있는 서비스를 개발하고 싶습니다.`}
            className="mt-4 base2 text-n-4 whitespace-pre-line"
          />
        </div>
      </Layout>
    </>
  )
}

export default BlogCreatePage
