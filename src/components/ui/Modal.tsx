import React, { PropsWithChildren, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { MdClose } from 'react-icons/md'

interface DialogProps extends PropsWithChildren {
  onClose: () => void,
  contentClass?: string,
}

const Dialog: React.FC<DialogProps> = ({ onClose, children, contentClass, ...props}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const data = props;
  console.log(data);

  // Improved focus trap logic
  const focusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = modalContentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length === 0) return;

    // Shift+Tab or Tab key navigation (hm har ek element modal ke andar wale par focus kar re hai)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Tab') focusTrap(e)
  }, [onClose, focusTrap]);


  useEffect(() => {
    // Set initial focus
    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return ReactDOM.createPortal(
    <div 
      role="dialog"
      aria-modal="true"
      aria-label='Dialog-Modal'
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f1f1f]/10 bg-opacity-50 backdrop-blur-sm"
    >
      <div 
        ref={modalContentRef}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-y-auto"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <MdClose size={24} />
        </button>
        
        <div className={` p-6 w-full h-full ${contentClass} line-clamp-auto`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Dialog