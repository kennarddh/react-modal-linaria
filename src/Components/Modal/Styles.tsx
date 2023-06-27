import { styled } from '@linaria/react'

export const StyledModal = styled.div<{
	width: number
	height: number
	top: number
	left: number
	display: 'block' | 'none'
}>`
	overflow: auto;
	resize: both;

	position: absolute;

	min-width: 200px;
	min-height: 50px;

	&::-webkit-resizer {
		border-right: 2px solid #000;
		border-bottom: 2px solid #000;
	}

	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	display: ${({ display }) => display};
`

export const ModalHeader = styled.div`
	width: 100%;
	height: 30px;

	background-color: #ececec;

	display: flex;
	justify-content: space-between;
	flex-direction: row;

	padding: 0 10px;
`

export const ModalHeaderRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	width: 100px;
`

export const ModalHeaderLeft = styled.p`
	display: flex;
	align-items: center;

	height: 100%;
	width: calc(100% - 100px);

	overflow-x: hidden;
`

export const ModalHeaderButton = styled.button`
	height: 100%;
	width: 50%;

	border: none;

	background-color: transparent;
`

export const ModalBody = styled.div`
	background-color: #d8d8d8;

	width: 100%;
	height: calc(100% - 30px);
`
