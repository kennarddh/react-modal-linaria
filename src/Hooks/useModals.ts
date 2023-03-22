import { useContext } from 'react'

import ModalsContext from 'Contexts/Modals'

const useModals = () => {
	return useContext(ModalsContext)
}

export default useModals
