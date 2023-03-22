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
}

export interface IModal {
	name: string
	x: number
	y: number
	width: number
	height: number
	status: IModalStatus
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
			status: IModalStatus.Open,
			x: 100,
			y: 100,
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
