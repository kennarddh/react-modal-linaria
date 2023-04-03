import { FC, createContext, ReactNode, useCallback, useState } from 'react'

import InputModal from 'Components/Modals/InputModal'

import { IValueOrFactory } from 'Types'

type IUpdateModal = (
	id: string,
	options: IValueOrFactory<Partial<IModal>, IModal>
) => void

interface IModalsContext {
	UpdateModal: IUpdateModal
	Modals: Record<string, IModal>
}

export enum IModalStatus {
	Open,
	Closed,
	Minimized,
}

export interface IModal {
	name: string
	x: number
	y: number
	width: number
	height: number
	status: IModalStatus
	component: FC
	componentState?: ReactNode
}

const ModalsContext = createContext<IModalsContext>({
	UpdateModal: () => undefined,
	Modals: {},
})

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [Modals, SetModals] = useState<Record<string, IModal>>({
		'316ca831-aa32-441f-955e-263a19be6617': {
			name: 'Text',
			height: 200,
			width: 200,
			status: IModalStatus.Closed,
			x: 100,
			y: 100,
			component: () => <p>Hello World</p>,
		},
		'8965416f-72b8-4dbf-985a-4a5cfa32ee82': {
			name: 'Input 1',
			height: 200,
			width: 200,
			status: IModalStatus.Closed,
			x: 100,
			y: 100,
			component: InputModal,
		},
		'd0231516-8519-44a6-a0dd-d542677711ed': {
			name: 'Input 2',
			height: 200,
			width: 200,
			status: IModalStatus.Closed,
			x: 100,
			y: 100,
			component: InputModal,
		},
	})

	const UpdateModal: IUpdateModal = useCallback((id, modal) => {
		SetModals(prev => {
			let data: Partial<IModal>

			if (typeof modal === 'function') {
				data = modal(prev[id])
			} else {
				data = modal
			}

			if (data.status === IModalStatus.Closed) {
				data.componentState = undefined
			} else if (
				data.status === IModalStatus.Open &&
				prev[id].status !== IModalStatus.Open
			) {
				const Component = { ...prev[id], ...data }.component

				data.componentState = <Component />
			} else if (
				data.status === IModalStatus.Minimized &&
				prev[id].status === IModalStatus.Closed
			) {
				throw new Error('Cannot minimize closed modal')
			}

			return {
				...prev,
				[id]: {
					...prev[id],
					...data,
				},
			}
		})
	}, [])

	return (
		<ModalsContext.Provider value={{ Modals, UpdateModal }}>
			{children}
		</ModalsContext.Provider>
	)
}

export default ModalsContext
