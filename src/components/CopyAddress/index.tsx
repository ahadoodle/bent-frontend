import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import copySvg from 'assets/images/copy.svg'
import { Icon } from 'components/Icon'

interface Props {
	address?: string | undefined | null,
	showTitle?: boolean
	style?: React.CSSProperties
}

export const CopyAddress = (props: Props): React.ReactElement => {
	const [copySuccess, setCopySuccess] = useState(false)
	const addressTextRef = useRef<HTMLTextAreaElement | null>(null)

	useEffect(() => {
		if (copySuccess) setTimeout(() => setCopySuccess(false), 2500)
	}, [copySuccess])

	function copyAddress() {
		if (!addressTextRef) return
		addressTextRef?.current?.select()
		document.execCommand('copy')
		setCopySuccess(true)
	}

	return (
		<CopyAccount onClick={copyAddress} style={props.style}>
			<Icon iconSrc={copySvg} borderColor="#CAB8FF" style={{ marginLeft: 0, margin: props.showTitle ? 10 : 0 }} />
			{props.showTitle && (!copySuccess ? 'Copy address' : 'Copied!')}
			<textarea
				readOnly
				style={{ height: 0, width: 0, opacity: 0.001, position: 'absolute', cursor: 'pointer', resize: 'none' }}
				ref={addressTextRef}
				value={props.address || ''}
			/>
		</CopyAccount>
	)
}

export const CopyAccount = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: #C1EAF8;
	text-decoration: none;
	cursor: pointer;
	margin-left: 10px;
`