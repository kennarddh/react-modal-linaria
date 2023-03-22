/* eslint-disable security/detect-object-injection */
import { FC, createContext, ReactNode, useCallback, useState } from 'react'

type IUpdateModal = (id: string, options: Partial<IModal>) => void

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

	const UpdateModal: IUpdateModal = useCallback((id, modal) => {
		SetModals(prev => ({
			...prev,
			[id]: {
				...prev[id],
				...modal,
			},
		}))
	}, [])

	return (
		<ModalsContext.Provider value={{ Modals, UpdateModal }}>
			{children}
		</ModalsContext.Provider>
	)
}

export default ModalsContext
