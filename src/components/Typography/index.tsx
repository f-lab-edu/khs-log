import {twMerge} from 'tailwind-merge'

import SkeletonDiv from '@/components/Skeleton'

interface Props {
  text: string
  className?: string
  isLoading?: boolean
}

const Typography = ({text, className = '', isLoading = false}: Props) => {
  return (
    <SkeletonDiv isLoading={isLoading} className={twMerge(className)}>
      {text}
    </SkeletonDiv>
  )
}

export default Typography
