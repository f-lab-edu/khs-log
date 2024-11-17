import {getPostsByRange} from '@/app/api/getPosts'
import BlogPage from '@/pages/BlogPage'

const INITIAL_MAXIMUM_INDEX = 1 // 처음에 불러올 데이터 수

export default async function Blog() {
  try {
    const data = await getPostsByRange(0, INITIAL_MAXIMUM_INDEX)

    if (!data || data.length === 0) {
      throw new Error('Posts data is empty or invalid')
    }

    return <BlogPage initialData={data} />
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching posts data:', error)
    return (
      <div className="text-center text-red-500">
        Error loading posts data. Please try again later.
      </div>
    )
  }
}
