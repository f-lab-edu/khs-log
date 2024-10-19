import {createBrowserClient} from '@/supabase/client'

export async function editBlog({
  id,
  title,
  imageUrl,
  content,
}: {
  id: string
  title: string
  imageUrl: string
  content: string
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('posts')
      .update({
        title,
        content,
        titleImageUrl: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('author_id', id)
      .select('*')

    if (error) {
      return alert('권한이 없습니다.')
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
