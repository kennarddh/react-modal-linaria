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

export enum IStatus {
	Open,
	Closed,
}

export interface IModal {
	x: number
	y: number
	width: number
	height: number
	status: IStatus
}

const ModalsContext = createContext<IModalsContext>({
	UpdateModal: () => undefined,
	Modals: {},
})

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [Modals, SetModals] = useState<Record<string, IModal>>({})

	const UpdateModal: IUpdateModal = useCallback(
		(id, modal) => {
			let data: Partial<IModal>

			if (typeof modal === 'function') {
				data = modal(Modals[id])
			} else {
				data = modal
			}

			SetModals(prev => ({
				...prev,
				[id]: {
					...prev[id],
					...data,
				},
			}))
		},
		[Modals]
	)

	return (
		<ModalsContext.Provider value={{ Modals, UpdateModal }}>
			{children}
		</ModalsContext.Provider>
	)
}

export default ModalsContext
