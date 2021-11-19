import { useCallback, useState } from 'react'

export const useModal = (): { isShown: boolean, toggle: () => void } => {
  const [isShown, setIsShown] = useState<boolean>(false)
  const toggle = useCallback(() => setIsShown(!isShown), [isShown])

  return {
    isShown,
    toggle,
  }
}
