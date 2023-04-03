import { FC, useState } from 'react'

const InputModal: FC = () => {
	const [Data, SetData] = useState<string>('')

	return (
		<>
			<input
				type='text'
				value={Data}
				onChange={event => SetData(event.target.value)}
			/>
			<button onClick={() => SetData('')}>Reset</button>
		</>
	)
}

export default InputModal
