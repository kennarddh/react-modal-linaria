import styled from 'styled-components'

export const Modal = styled.div`
	background-color: #d8d8d8;

	overflow: auto;
	resize: both;

	position: absolute;

	&::-webkit-resizer {
		border-right: 2px solid #000;
		border-bottom: 2px solid #000;
	}
`

export const Container = styled.div`
	height: 100vh;
	position: relative;
	overflow: hidden;
`
