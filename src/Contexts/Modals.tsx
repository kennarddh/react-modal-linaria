import { FC, createContext, ReactNode, useCallback, useState } from 'react'

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
			name: 'First',
			height: 200,
			width: 200,
			status: IModalStatus.Closed,
			x: 100,
			y: 100,
			component: () => <p>hello</p>,
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
