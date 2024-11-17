import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@/shared/constants'

export async function getAllPosts() {
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

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching posts data:', error)
  }
}

export async function getPostsByRange(from: number, to: number) {
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
        Range: `${from}-${to}`, // 페이지네이션 범위 설정
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts data')
    }

    const data = await response.json()

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching posts data:', error)
    return []
  }
}
