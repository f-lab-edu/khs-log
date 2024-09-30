import Link from 'next/link'
import {useEffect, useState} from 'react'
import {twMerge} from 'tailwind-merge'

import LeftSideBar from '@/components/LeftSideBar'
import RightCommentBar from '@/components/RightCommentBar'

type LayoutProps = {
  smallSidebar?: boolean
  hideRightSidebar?: boolean
  backUrl?: string
  children: React.ReactNode
}

const Layout = ({
  smallSidebar,
  hideRightSidebar,
  backUrl,
  children,
}: LayoutProps) => {
  const [visibleSidebar, setVisibleSidebar] = useState<any>(
    smallSidebar || false,
  )
  const [visibleRightSidebar, setVisibleRightSidebar] = useState<boolean>(false)

  const handleClickOverlay = () => {
    setVisibleSidebar(true)
    setVisibleRightSidebar(false)
  }

  useEffect(() => {
    setVisibleSidebar(smallSidebar)
  }, [smallSidebar])

  return (
    <div>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
          visibleSidebar
            ? 'pl-24 md:pl-0'
            : smallSidebar
              ? 'pl-24 md:pl-0'
              : 'pl-80 xl:pl-24 md:pl-0'
        }`}>
        <LeftSideBar />
        <div
          className={`flex py-6 md:py-0 ${
            hideRightSidebar
              ? 'min-h-screen min-h-screen-ios'
              : 'h-screen h-screen-ios'
          }`}>
          <div
            className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6 ${
              !hideRightSidebar && 'pr-[22.5rem] 2xl:pr-80 lg:pr-0'
            }`}>
            <div
              className={`relative flex flex-col grow max-w-full ${
                !hideRightSidebar && 'md:pt-18'
              }`}>
              {hideRightSidebar && smallSidebar && (
                <Link
                  className="absolute top-6 right-6 flex justify-center items-center w-10 h-10 border-2 border-n-4/25 rounded-full text-0 transition-colors hover:border-transparent hover:bg-n-4/25"
                  href={backUrl || '/'}>
                  {/* <Image className="fill-n-4" /> */}
                </Link>
              )}
              {children}
            </div>
            {!hideRightSidebar && <RightCommentBar />}
          </div>
        </div>
        <div
          className={twMerge(
            `fixed inset-0 z-10 bg-n-7/80 invisible opacity-0 md:hidden ${
              (!visibleSidebar && smallSidebar) ||
              (visibleRightSidebar && 'visible opacity-100')
            }`,
          )}
          onClick={handleClickOverlay}
        />
      </div>
    </div>
  )
}

export default Layout
