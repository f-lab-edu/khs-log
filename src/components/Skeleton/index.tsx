import {type ReactNode} from 'react'

interface Props {
  isLoading: boolean
  children: ReactNode
  className?: string
}

const SkeletonDiv = ({isLoading, children, className = ''}: Props) => {
  if (isLoading) {
    return <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
  }
  return <div className={className}>{children}</div>
}

export default SkeletonDiv
