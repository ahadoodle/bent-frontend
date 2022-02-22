import { useCallback, useEffect } from 'react'

export function useKeyDown(targetKey: string, callback: () => void) {
	const onPress = useCallback(({ key }) => {
		if (key === targetKey) {
			callback()
		}
	}, [targetKey, callback])

	useEffect(() => {
		window.addEventListener('keydown', onPress);
		return () => {
			window.removeEventListener('keydown', onPress);
		};
	}, [onPress]);
}
