import {useEffect} from 'react'
import {twMerge} from 'tailwind-merge'

type ModalProps = {
  className?: string
  classWrap?: string
  classOverlay?: string
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({
  className,
  classWrap,
  visible,
  onClose,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때 body 스크롤 비활성화
      document.documentElement.style.overflow = 'hidden'
    } else {
      // 모달이 닫힐 때 body 스크롤 활성화
      document.documentElement.style.overflow = 'auto'
    }

    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={twMerge(
        `fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 ${className}`,
      )}
      onClick={onClose}>
      <div
        className={twMerge(
          `relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl ${classWrap}  overflow-auto`,
        )}
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
