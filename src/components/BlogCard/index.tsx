import Image from '@/components/Image'

const BlogCard = () => {
  return (
    <div className="max-w-[50rem]">
      <div className="pt-6 px-6 pb-16 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-14">
        <div className="relative max-w-[32.5rem] aspect-[1.6] xl:max-w-full">
          <Image
            className="rounded-xl object-cover"
            src="/images/ogu.webp"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1499px) 50vw, 33.33vw"
            alt="blogContent"
          />
        </div>
        <div className="mt-4">블로그 게시글 예시입니다.</div>
        <div className="flex flex-wrap">
          <button className="btn-dark btn-small mr-4 mt-4">
            <span>View More</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
