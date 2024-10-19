'use client'

import {twMerge} from 'tailwind-merge'

import IconButton from '@/components/IconButton'

type ModalProps = {
  className?: string
  classWrap?: string
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({
  className,
  classWrap,
  visible,
  children,
  onClose,
}: ModalProps) => {
  if (!visible) return null // visible이 false일 경우 아무것도 렌더링하지 않음

  return (
    <div
      className={twMerge(
        `fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 ${className}`,
      )}>
      <div
        className={twMerge(
          `relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl ${classWrap} overflow-auto`,
        )}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 방지
        aria-labelledby="modal-title">
        <div className="flex flex-row-reverse">
          <IconButton
            buttonClassName="bg-transparent hover:bg-transparent"
            iconName="close"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
