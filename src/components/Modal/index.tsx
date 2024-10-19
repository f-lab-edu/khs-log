'use client'

import {useEffect, useCallback} from 'react'
import {twMerge} from 'tailwind-merge'

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
  onClose,
  children,
}: ModalProps) => {
  // Escape 키를 눌러 모달을 닫는 기능 추가
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  // Enter와 Space 키를 눌렀을 때 모달 외부를 클릭한 것처럼 작동하게 함
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때 body 스크롤 비활성화 및 키보드 이벤트 등록
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      // 모달이 닫힐 때 body 스크롤 활성화 및 키보드 이벤트 해제
      document.documentElement.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.documentElement.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, handleKeyDown])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={twMerge(
        `fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 ${className}`,
      )}
      onClick={onClose}
      tabIndex={-1} // 모달 외부 클릭을 통한 닫기 기능을 위한 tabIndex 추가
      onKeyDown={handleKeyPress} // 키보드 입력을 통한 모달 닫기 기능 추가
    >
      <div
        className={twMerge(
          `relative z-10 max-w-[48rem] w-full m-auto bg-white max-h-[90vh] rounded-3xl ${classWrap} overflow-auto`,
        )}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 방지
        tabIndex={0} // 모달 내부 요소에 대해 포커스가 가능하도록 tabIndex 추가
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
