import {createBrowserClient} from '@/supabase/client'

export async function addFavorite({
  userId,
  blogId,
}: {
  userId: string
  blogId: string
}) {
  const supabase = createBrowserClient()

  try {
    const {error} = await supabase.from('favorites').insert({
      user_id: userId,
      post_id: blogId,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return alert('권한이 없습니다.')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
