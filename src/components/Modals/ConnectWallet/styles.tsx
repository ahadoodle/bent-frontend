import styled from 'styled-components'

export const ConnectContainer = styled.div`
	text-align: center;

	h3 {
		font-weight: 500;
		font-size: 22px;
		line-height: 32px;
		color: #33B6E1;
		margin: 8px auto;
	}

	p {
		font-weight: 300;
		font-size: 16px;
		line-height: 24px;
		margin: 8px auto;
	}

	a {
		cursor: pointer;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90px;
	width: 90px;
	margin: 16px auto 0;
	border-radius: 50%;
	img {
		height: 80px;
		width: 80px;
	}
	border: 3px solid #414C5C;
`

export const WalletMenu = styled.div`
	margin: 30px auto;
	display: flex;
	flex-direction: column;
`

export const WalletMenuItem = styled.div<{ isConnected: boolean, disabled: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 64px;
	padding: 10px 20px;
	border-radius: 20px;
	cursor: pointer;
	margin: 8px 0px;
	box-shadow: 0px 4px 12px rgba(2, 10, 33, 0);
	transition: border .1s, box-shadow .1s;
	background: #33B6E1;
	&:hover {
		box-shadow: 0px 0px 40px rgba(51, 182, 225, 0.4);
	}

	${p => p.isConnected ?
		`cursor: default;` :
		`&:hover {
			box-shadow:
				0px 4px 12px rgba(2, 10, 33, 0.05),
				0px 2px 6px rgba(2, 10, 33, 0.05),
				0px 2px 2px rgba(2, 10, 33, 0.02);
		}`
	}

	${p => p.disabled ?
		`
			color: #D0D6E6;
			background: #F8F9FB;
			cursor: not-allowed;
		` :
		``
	}

	@media screen and (max-width: 480px) {
		padding: 10px;
	}
`

export const LogoGroup = styled.div`
	display: flex;
	align-items: center;
	color: white;
	margin-right: 20px;
	img {
		height: 40px;
		width: 40px;
		margin-right: 12px;
	}
`

export const DisconnectButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 0px;
	background: transparent;
	border: none;
	font-size: 15px;
	cursor: pointer;
	opacity: 1;
	transition: opacity .3s;

	&:hover {
		opacity: .75;
	}
`

export const ErrorMsg = styled.div`
	width: auto;
	margin-top: 12px;
	padding: 6px 12px;
	border-radius: 4px;
	color: #FF4545;
	background: rgb(255 132 132 / 8%);
	border-radius: 20px;
`