import Button from '@/components/Button'
import Image from '@/components/Image'

const BlogCard = () => {
  return (
    <div className="w-full max-w-[30rem] mx-auto">
      <div className="pt-6 px-6 pb-16 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14">
        <div className="relative aspect-[1.6] w-full">
          <Image
            className="rounded-xl object-cover"
            src="/images/ogu.webp"
            fill
            alt="blogContent"
          />
        </div>
        <div className="mt-4">블로그 게시글 예시입니다.</div>
        <div className="flex flex-wrap">
          <Button
            name="View More"
            onClick={() => console.log('View More')}
            className="mr-4 mt-4 "
          />
        </div>
      </div>
    </div>
  )
}

export default BlogCard
