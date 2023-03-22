import { FC, useCallback, useEffect } from 'react'

import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import useRefCallback from 'Hooks/useRefCallback'
import useModals from 'Hooks/useModals'

import { IModalStatus } from 'Contexts/Modals'

import { IModalItem } from 'Types'

import {
	StyledModal,
	ModalHeader,
	ModalBody,
	ModalHeaderLeft,
	ModalHeaderRight,
	ModalHeaderButton,
} from './Styles'

const Modal: FC<{ id: string }> = ({ id }) => {
	const { Modals, UpdateModal } = useModals()

	const ModalRef = useRefCallback<HTMLDivElement | null>(null, () => {
		if (!ModalRef.current) return

		const modal = ModalRef.current

		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect

			if (width !== 0) {
				UpdateModal(id, { width })
			}

			if (height !== 0) {
				UpdateModal(id, { height })
			}
		})

		resizeObserver.observe(modal)

		return () => {
			resizeObserver.unobserve(modal)
		}
	})

	const [, drag, dragPreview] = useDrag<IModalItem>(
		() => ({
			type: 'Modal',
			item: { id },
		}),
		[]
	)

	useEffect(() => {
		dragPreview(getEmptyImage(), { captureDraggingState: true })
	}, [dragPreview])

	const Close = useCallback(() => {
		UpdateModal(id, { status: IModalStatus.Closed })
	}, [UpdateModal, id])

	return (
		<StyledModal
			ref={ModalRef}
			style={{
				width: Modals[id].width,
				height: Modals[id].height,
				top: Modals[id].y,
				left: Modals[id].x,
			}}
		>
			<ModalHeader ref={drag}>
				<ModalHeaderLeft>{Modals[id].name}</ModalHeaderLeft>
				<ModalHeaderRight>
					<ModalHeaderButton>-</ModalHeaderButton>
					<ModalHeaderButton onClick={Close}>X</ModalHeaderButton>
				</ModalHeaderRight>
			</ModalHeader>
			<ModalBody></ModalBody>
		</StyledModal>
	)
}

export default Modal
