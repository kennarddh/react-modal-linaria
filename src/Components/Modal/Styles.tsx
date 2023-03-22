import styled from 'styled-components'

export const StyledModal = styled.div`
	overflow: auto;
	resize: both;

	position: absolute;

	min-width: 200px;
	min-height: 50px;

	&::-webkit-resizer {
		border-right: 2px solid #000;
		border-bottom: 2px solid #000;
	}
`

export const ModalHeader = styled.div`
	width: 100%;
	height: 30px;

	background-color: #ececec;

	display: flex;
	justify-content: flex-end;
`

export const ModalHeaderRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	width: 100px;
`

export const ModalBody = styled.div`
	background-color: #d8d8d8;

	width: 100%;
	height: calc(100% - 30px);
`
