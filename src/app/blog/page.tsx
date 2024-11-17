import {getPostsByRange} from '@/app/api/getPosts'
import BlogPage from '@/pages/BlogPage'

const INITIAL_MAXIMUM_INDEX = 1 // 처음에 불러올 데이터 수

export default async function Blog() {
  try {
    const data = await getPostsByRange(0, INITIAL_MAXIMUM_INDEX)

    if (!data || data.length === 0) {
      return (
        <div className="text-center text-gray-500">
          No posts available. Please try again later.
        </div>
      )
    }

    return <BlogPage initialData={data} />
  } catch (error) {
    return (
      <div className="text-center text-red-500">
        Error loading posts data. Please try again later.
      </div>
    )
  }
}
