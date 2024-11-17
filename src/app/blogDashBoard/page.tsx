import {getAllPosts} from '@/app/api/getPosts'
import BlogDashBoardPage from '@/pages/BlogDashBoardPage'

export default async function BlogDashBoard() {
  try {
    const data = await getAllPosts()

    if (!data || !data.length) {
      throw new Error('Posts data is empty or invalid')
    }

    return <BlogDashBoardPage data={data} />
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
