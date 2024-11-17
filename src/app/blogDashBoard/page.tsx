import BlogDashBoardPage from '@/pages/BlogDashBoardPage'
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@/shared/constants'

export default async function BlogDashBoard() {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error(
        'Supabase URL or ANON KEY is missing in environment variables.',
      )
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts data')
    }

    const data = await response.json()

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
