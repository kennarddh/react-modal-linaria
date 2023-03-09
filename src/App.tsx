import { FC, useEffect, useRef, useState } from 'react'

import { useDrag, useDrop, XYCoord } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import ReactPortal from 'Components/ReactPortal/ReactPortal'

import { Modal, Container, ModalHeader, ModalBody } from './AppStyles'
import Clamp from 'Utils/Clamp'
import useRefCallback from 'Hooks/useRefCallback'

const App: FC = () => {
	const [Width, SetWidth] = useState<number>(500)
	const [Height, SetHeight] = useState<number>(300)
	const [Top, SetTop] = useState<number>(0)
	const [Left, SetLeft] = useState<number>(0)

	const PrevDeltaRef = useRef<XYCoord | null>(null)

	const ModalRef = useRefCallback<HTMLDivElement | null>(null, () => {
		if (!ModalRef.current) return

		const modal = ModalRef.current

		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect

			if (width !== 0) {
				SetWidth(width)
			}

			if (height !== 0) {
				SetHeight(height)
			}
		})

		resizeObserver.observe(modal)

		return () => {
			resizeObserver.unobserve(modal)
		}
	})

	const [, drop] = useDrop(
		() => ({
			accept: 'Modal',
			hover(_, monitor) {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const prevDeltaX = PrevDeltaRef.current?.x ?? 0
				const prevDeltaY = PrevDeltaRef.current?.y ?? 0

				SetTop(prev => prev + deltaY - prevDeltaY)
				SetLeft(prev => prev + deltaX - prevDeltaX)

				PrevDeltaRef.current = { x: deltaX, y: deltaY }
			},
			drop() {
				PrevDeltaRef.current = { x: 0, y: 0 }
			},
		}),
		[]
	)

	const [, drag, dragPreview] = useDrag(
		() => ({
			type: 'Modal',
		}),
		[]
	)

	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true })
	}, [dragPreview])

	return (
		<ReactPortal wrapperId='modals'>
			<Container ref={drop}>
				<Modal
					ref={ModalRef}
					style={{
						width: Width,
						height: Height,
						top: Top,
						left: Left,
					}}
				>
					<ModalHeader ref={drag}></ModalHeader>
					<ModalBody></ModalBody>
				</Modal>
			</Container>
		</ReactPortal>
	)
}

export default App
