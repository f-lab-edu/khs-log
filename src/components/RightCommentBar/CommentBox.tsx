import Link from 'next/link'

import {type Database} from '@/supabase/database.types'

interface Props {
  item: Database['public']['Tables']['comments']['Row']
}

const CommentBox = ({item}: Props) => {
  return (
    <div className="relative">
      <Link className="block mt-2" href={item.post_id ?? ''}>
        <div className="group py-3 px-3 rounded-xl transition-colors hover:bg-n-3/75">
          <div className="truncate base1 font-semibold text-n-6">
            {item.username}
          </div>
          <div className="mt-1 base2 text-n-5">{item.content}</div>
          <div className="flex justify-between items-center mt-2">
            <div className="caption2 text-n-4/75">{item.created_at}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CommentBox
