import { FC, useCallback } from 'react'

import useModals from 'Hooks/useModals'

import { IModalStatus } from 'Contexts/Modals'

import { StyledFooter, FooterItem } from './Styles'

const Footer: FC = () => {
	const { Modals, UpdateModal } = useModals()

	const ToggleMinimized = useCallback(
		(id: string) => {
			UpdateModal(id, prev => ({
				status:
					prev.status === IModalStatus.Minimized
						? IModalStatus.Open
						: IModalStatus.Minimized,
			}))
		},
		[UpdateModal]
	)

	return (
		<StyledFooter>
			{Object.keys(Modals).map(id => (
				<FooterItem key={id} onClick={() => ToggleMinimized(id)}>
					{Modals[id].name}
				</FooterItem>
			))}
		</StyledFooter>
	)
}

export default Footer
