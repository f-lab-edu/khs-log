import {createBrowserClient} from '@/supabase/client'

export async function createProfile({
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
      .insert({role, contents, mainTitle, subTitle, skills, tools})

    if (error) {
      return alert('권한이 없습니다.')
    }
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
