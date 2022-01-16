import { ScreenType } from 'constant';
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'

export const useScreenType = (): ScreenType => {
	let screenType: ScreenType = ScreenType.BigScreen;
	const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)" });
	const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)" });
	const isLaptop = useMediaQuery({ query: "(min-device-width: 1024px)" });
	const isDesktop = useMediaQuery({ query: "(min-device-width: 1200px)" });
	const isBigScreen = useMediaQuery({ query: "(min-device-width: 1201px )" });
	if (isBigScreen) screenType = ScreenType.BigScreen;
	else if (isDesktop) screenType = ScreenType.Desktop;
	else if (isLaptop) screenType = ScreenType.Laptop;
	else if (isTabletDevice) screenType = ScreenType.Tablet;
	else if (isMobileDevice) screenType = ScreenType.Mobile;
	return screenType;
}

export function useIsMobile(): boolean {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			setWindowHeight(window.innerHeight)
		}
		// initialize resize listener
		window.addEventListener('resize', handleResize)
		handleResize();
		// cleanup listener
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// watch width changes, update breakpoint helpers
	useEffect(() => {
		const ratio = windowWidth / windowHeight;
		if ((ratio < 1) && !isMobileWidth) {
			setIsMobileWidth(true)
		}
		else if ((ratio >= 1) && isMobileWidth) {
			setIsMobileWidth(false)
		}
	}, [windowWidth, windowHeight, isMobileWidth])

	return isMobileWidth;
}
