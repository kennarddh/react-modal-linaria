import styled from 'styled-components'

export const StyledFooter = styled.div`
	position: absolute;

	bottom: 0;
	width: 100%;
	height: 50px;

	background-color: #dfdfdf;

	z-index: 10;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	gap: 10px;

	padding: 0 50px;
`

export const FooterItem = styled.button`
	width: fit-content;
	height: 50px;
	min-width: 30px;

	padding: 0 10px;

	box-sizing: content-box;

	background-color: #979797;

	z-index: 20;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	border: none;
`
