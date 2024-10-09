import {createBrowserClient} from '@/supabase/client'

export async function createComment({
  userId,
  blogId,
  content,
}: {
  userId: string
  blogId: string
  content: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('comments').insert({
      user_id: userId,
      post_id: blogId,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      return alert('권한이 없습니다.')
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
