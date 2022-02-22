import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { useKeyDown } from 'hooks'
import { Backdrop, Content, Wrapper } from './styles'

export interface ModalProps {
	isShown: boolean | undefined
	onRequestClose: () => void
	onModalClose: () => void
	children: ReactNode
	title: string
	customStyles?: {
		backdrop?: React.CSSProperties
		modal?: React.CSSProperties
		header?: React.CSSProperties
		content?: React.CSSProperties
	}
}

export const Modal: FunctionComponent<ModalProps> = ({
	isShown,
	onRequestClose,
	onModalClose,
	children,
	title,
	customStyles,
}) => {

	const [closeRequestSent, setCloseRequest] = React.useState(false);

	useEffect(() => {
		if (closeRequestSent && isShown === false) {
			onModalClose()
		}
	}, [isShown, closeRequestSent, onModalClose])

	const requestClose = () => {
		setCloseRequest(true)
		onRequestClose()
	}

	useKeyDown('Escape', () => isShown && requestClose())

	const modal = (
		<React.Fragment>
			<Backdrop style={customStyles?.backdrop} onClick={requestClose} />
			<Wrapper>
				<BoxContainer title={title} style={{ margin: 'auto' }}>
					<Content style={customStyles?.content}>
						{children}
					</Content>
				</BoxContainer>
			</Wrapper>
		</React.Fragment>
	)

	return isShown ? ReactDOM.createPortal(modal, document.body) : null
}

interface Props {
	title: string;
	secondTitle?: string;
	children?: React.ReactElement;
	style?: React.CSSProperties;
	contentStyle?: React.CSSProperties;
}

export const BoxContainer = (props: Props): React.ReactElement => {
	const [hover, setHover] = useState<boolean>(false);

	return (
		<Container
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={props.style}
		>
			<div style={{ ...props.contentStyle, marginTop: 34 }}>
				{props.children}
			</div>
			<TitleContainer>
				<Title>
					<TitleEcllipse hover={hover} />
					{props.title}
				</Title>
				{props.secondTitle && <SecondTitle>{props.secondTitle}</SecondTitle>}
			</TitleContainer>
		</Container>
	)
}

const Container = styled.div`
	transition: box-shadow .2s;
	color: white;
	width: fit-content;
	backdrop-filter: blur(10px);
	background: linear-gradient(102.05deg, rgba(37, 49, 67, 0.15) -0.64%, rgba(0, 0, 0, 0) 98.13%);
	border-radius: 20px;
	border: 1px solid #414C5C;
	&:hover {
		box-shadow: 0px 0px 30px rgba(193, 255, 215, 0.4);
	}
	overflow: hidden;
	position: relative;
`;

const TitleContainer = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	z-index: 1;
`;

const Title = styled.div`
	border-radius: 20px 0px;
	background: #37455930;
	backdrop-filter: blur(20px);
	color: white;
	// color: linear-gradient(269.89deg, #9DE5FF -2.43%, #33B6E1 98.9%);
	height: 38px;
	width: fit-content;
	padding: 10px 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 1px #414C5C;
	border-style: none solid solid none;
`;

const SecondTitle = styled.div`
	margin-left: auto;
	border-radius: 0px 20px;
	background: white;
	color: #33B6E1;
	// color: linear-gradient(269.89deg, #9DE5FF -2.43%, #33B6E1 98.9%);
	height: 38px;
	width: fit-content;
	padding: 10px 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const TitleEcllipse = styled.div<{ hover: boolean }>`
	transition: background .2s;
	background: ${props => props.hover ? '#C1FFD7' : 'none'};
	border: 1px solid #C1FFD7;
	box-sizing: border-box;
	border-radius: 50%;
	width: 12px;
	height: 12px;
	margin-right: 10px;
`;