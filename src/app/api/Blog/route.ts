import {NextResponse} from 'next/server'

import {createBrowserClient} from '@/supabase/client'

export async function GET() {
  const supabase = createBrowserClient()

  try {
    const {data, error} = await supabase.from('comments').select('*')

    if (error) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching blog detail and comments'},
      {status: 500},
    )
  }
}
