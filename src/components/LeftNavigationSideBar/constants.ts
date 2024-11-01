import {type NavigationType} from '@/components/LeftNavigationSideBar/Navigation'

export const NAVIGATION: NavigationType[] = [
  {
    title: '홈',
    url: '/',
    icon: 'home',
    iconClass: 'fill-accent-1',
  },
  {
    title: '게시글',
    url: '/blog',
    icon: 'blog',
    iconClass: 'fill-accent-2',
  },
  {
    title: '즐겨찾기',
    url: '/favorite',
    icon: 'favorite',
    iconClass: 'fill-accent-5',
  },
  {
    title: '글 작성하기',
    url: '/blogCreate',
    icon: 'create',
    iconClass: 'fill-primary-2',
  },
  {
    title: '글 관리하기',
    url: '/blogDashBoard',
    icon: 'settings',
    iconClass: 'fill-accent-3',
  },
]
