/* eslint-disable security/detect-object-injection */
import { FC, createContext, ReactNode, useCallback, useState } from 'react'

type IMoveModal = (options: { id: string; x: number; y: number }) => void

interface IModalsContext {
	MoveModal: IMoveModal
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
	MoveModal: () => undefined,
	Modals: {},
})

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [Modals, SetModals] = useState<Record<string, IModal>>({})

	const MoveModal: IMoveModal = useCallback(({ id, x, y }) => {
		SetModals(prev => ({
			...prev,
			[id]: {
				...prev[id],
				x,
				y,
			},
		}))
	}, [])

	return (
		<ModalsContext.Provider value={{ Modals, MoveModal }}>
			{children}
		</ModalsContext.Provider>
	)
}

export default ModalsContext
