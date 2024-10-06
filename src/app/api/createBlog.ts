import {createBrowserClient} from '@/supabase/client'

export async function createBlog({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('posts').insert({
      author_id: id,
      title,
      content,
      created_at: new Date().toISOString(),
      published: true,
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
