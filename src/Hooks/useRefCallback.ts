import { useCallback, useRef } from 'react'

const useRefCallback = <T>(
	initial: T,
	callback: () => (() => void) | undefined
) => {
	const Ref = useRef<T>(initial)

	const LastCallbackCleanUpRef = useRef<(() => void) | undefined>(undefined)

	const SetRef: {
		(newValue: T): void
		current?: T
	} = useCallback(
		(newValue: T) => {
			if (Ref.current) {
				LastCallbackCleanUpRef.current?.()
			}

			// Save a reference to the node
			Ref.current = newValue

			SetRef.current = newValue

			LastCallbackCleanUpRef.current = callback()
		},
		[callback]
	)

	return SetRef
}

export default useRefCallback
