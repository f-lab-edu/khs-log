import Link from 'next/link'
import {usePathname} from 'next/navigation'

import Image from '@/components/Image'

interface Props {
  id: number
  title: string
  content: string
  image: string
}

const BlogCard = ({id, title, content, image}: Props) => {
  const pathname = usePathname()

  const isBlogPage = pathname.includes('Blog')

  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-6 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14">
        <div
          className={`relative w-full ${isBlogPage ? 'aspect-[1]' : 'aspect-[2.4]'} `}>
          <Image
            className="rounded-xl object-cover"
            src={image}
            fill
            alt="blogContent"
            priority
          />
        </div>
        <div className="mt-4 base1">{title}</div>
        <div className={`mt-4 ${!isBlogPage && 'truncate'}`}>{content}</div>
        <div className="flex flex-wrap">
          <Link href={`/BlogDetail/${id}`} className="btn-dark btn-small mr-4">
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
