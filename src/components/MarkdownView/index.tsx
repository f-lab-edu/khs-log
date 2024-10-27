import {twMerge} from 'tailwind-merge'

import SkeletonDiv from '@/components/Skeleton'

interface Props {
  content: string
  className?: string
  isLoading?: boolean
}

const MarkdownView = ({content, className, isLoading = false}: Props) => {
  return (
    <SkeletonDiv
      isLoading={isLoading}
      className={twMerge(className)}
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, '<br />'),
      }}
    />
  )
}

export default MarkdownView
