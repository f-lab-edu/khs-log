import {type HTMLAttributes, type ReactNode} from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  children?: ReactNode
  className?: string
}

const SkeletonDiv = ({isLoading, children, className = '', ...rest}: Props) => {
  if (isLoading) {
    return <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
  }
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export default SkeletonDiv
