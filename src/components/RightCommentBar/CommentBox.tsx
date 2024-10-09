import Link from 'next/link'

import Image from '@/components/Image'
import {type Database} from '@/supabase/database.types'

interface Props {
  item: Database['public']['Tables']['comments']['Row']
}

const CommentBox = ({item}: Props) => {
  return (
    <div className="relative mt-2">
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 border-2 border-n-4/50 rounded-md overflow-hidden bg-pastelBlue flex items-center justify-center">
          <Image
            className="object-cover"
            alt="check"
            src="/images/smileHeart.png"
            width={30}
            height={30}
          />
        </div>
        <div className="truncate base1 font-semibold text-n-6">
          {item.username}
        </div>
      </div>
      <Link className="block mt-2 pl-3" href={item.post_id ?? ''}>
        <div className="group py-3 px-3 rounded-xl transition-colors hover:bg-n-3/75">
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
