import { FC, useCallback, useEffect, useRef, useState } from 'react'

import ReactPortal from 'Components/ReactPortal/ReactPortal'

import { Modal } from './AppStyles'

const App: FC = () => {
	const [Width, SetWidth] = useState<number>(500)
	const [Height, SetHeight] = useState<number>(300)

	const ModalRef = useRef<HTMLDivElement>(null)

	const OnResize = useCallback((event: UIEvent) => {
		console.log(event.detail)
	}, [])

	useEffect(() => {
		if (!ModalRef.current) return

		const modal = ModalRef.current

		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect

			SetWidth(width)
			SetHeight(height)

			console.log(width, height)
		})

		resizeObserver.observe(modal)

		return () => {
			resizeObserver.unobserve(modal)
		}
	}, [OnResize])

	return (
		<div>
			<ReactPortal wrapperId='modal'>
				<Modal
					ref={ModalRef}
					style={{ width: Width, height: Height }}
				></Modal>
			</ReactPortal>
		</div>
	)
}

export default App
