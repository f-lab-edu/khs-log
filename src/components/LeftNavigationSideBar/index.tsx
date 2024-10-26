import {twMerge} from 'tailwind-merge'

import BlogTitle from '@/components/BlogTitle'
import {NAVIGATION} from '@/components/LeftNavigationSideBar/constants'
import Navigation from '@/components/LeftNavigationSideBar/Navigation'
import Profile from '@/components/Profile'
import {type User} from '@/store/user'

interface Props {
  user: User | null
  isLeftSideBarVisible?: boolean
}

const LeftNavigationSideBar = ({user, isLeftSideBarVisible = false}: Props) => {
  const isLogin = !!user

  const sideBarClass = twMerge(
    'fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-30 px-4 bg-n-7 transition-opacity md:invisible md:opacity-0',
    isLeftSideBarVisible ? 'w-24 pb-38 md:w-16 md:px-0 md:pb-30' : 'w-80 pb-58',
  )

  const headerClass = twMerge(
    'absolute top-0 right-0 left-0 flex items-center h-30 pl-7 pr-6',
    isLeftSideBarVisible ? 'justify-center md:px-4' : 'justify-between',
  )

  return (
    <div className={sideBarClass}>
      <div className={headerClass}>
        {!isLeftSideBarVisible && (
          <BlogTitle title="khs-log" isLogin={isLogin} />
        )}
      </div>

      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navigation
          isSideBarVisible={isLeftSideBarVisible}
          items={NAVIGATION}
        />
      </div>

      <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
        <Profile
          isSideBarVisible={isLeftSideBarVisible}
          isLogin={isLogin}
          nickname={user?.nickname ?? ''}
        />
      </div>
    </div>
  )
}

export default LeftNavigationSideBar
