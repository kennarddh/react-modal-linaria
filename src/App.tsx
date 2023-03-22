import { FC, useRef } from 'react'

import { useDrop, XYCoord } from 'react-dnd'

import ReactPortal from 'Components/ReactPortal/ReactPortal'
import Modal from 'Components/Modal/Modal'
import Footer from 'Components/Footer/Footer'

import useModals from 'Hooks/useModals'

import { IModalStatus } from 'Contexts/Modals'

import { IModalItem } from 'Types'

import { Container } from './AppStyles'

const App: FC = () => {
	const PrevDeltaRef = useRef<XYCoord | null>(null)

	const { UpdateModal, Modals } = useModals()

	const [, drop] = useDrop<IModalItem>(
		() => ({
			accept: 'Modal',
			hover(item, monitor) {
				const delta = monitor.getDifferenceFromInitialOffset()

				const deltaX = delta?.x ?? 0
				const deltaY = delta?.y ?? 0

				const prevDeltaX = PrevDeltaRef.current?.x ?? 0
				const prevDeltaY = PrevDeltaRef.current?.y ?? 0

				UpdateModal(item.id, prev => ({
					y: prev.y + deltaY - prevDeltaY,
					x: prev.x + deltaX - prevDeltaX,
				}))

				PrevDeltaRef.current = { x: deltaX, y: deltaY }
			},
			drop() {
				PrevDeltaRef.current = { x: 0, y: 0 }
			},
		}),
		[]
	)

	return (
		<>
			<Footer />
			<ReactPortal wrapperId='modals'>
				<Container ref={drop}>
					{Object.keys(Modals)
						.filter(id => Modals[id].status === IModalStatus.Open)
						.map(id => (
							<Modal id={id} key={id} />
						))}
				</Container>
			</ReactPortal>
		</>
	)
}

export default App
