import {useEffect, useState} from 'react'

import LeftSideBar from '@/components/LeftSideBar'
import RightCommentBar from '@/components/RightCommentBar'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false)

  useEffect(() => {
    setIsSideBarVisible(true)
  }, [])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
          isSideBarVisible ? 'pl-24 md:pl-0' : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftSideBar isLeftSideBarVisible={isSideBarVisible} />
        <div className={`flex py-6 md:py-0`}>
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6`}>
            <div className={`relative flex flex-col grow max-w-full md:pt-18`}>
              {children}
            </div>
            <RightCommentBar
              className={`${!isSideBarVisible && 'md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
