import {createBrowserClient} from '@/supabase/client'

export async function editProfile({
  role,
  contents,
  mainTitle,
  subTitle,
  skills,
  tools,
}: {
  role: string
  contents: string
  mainTitle: string
  subTitle: string
  skills: string[]
  tools: string[]
}) {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase
      .from('profile')
      .update({role, contents, mainTitle, subTitle, skills, tools})
      .eq('role', role)
      .select('*')

    if (error) {
      return alert('권한이 없습니다.')
    }
    return data[0]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
