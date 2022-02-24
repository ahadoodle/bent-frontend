import React from 'react';
import styled from 'styled-components'
import { Modal } from 'components/Modal'
import {
	useBentCirculatingSupply,
	useTokenPrice,
	useVlCvxBalance,
	useVotingPower,
	useWeBentBentBalance
} from 'hooks';
import { TOKENS } from 'constant';
import { BigNumber, utils } from 'ethers';
import { formatBigNumber, formatMillionsBigNumber } from 'utils';
import { Icon } from 'components/Icon';
import cmcIcon from 'assets/images/coinmarketcap.svg';
import cgcIcon from 'assets/images/coingecko.svg';
import mediumIcon from 'assets/images/medium.svg';
import discordIcon from 'assets/images/discord.svg';
import telegramIcon from 'assets/images/telegram.svg';

interface Props {
	isShown: boolean
	onRequestClose: () => void
}

export const MarketModal = (props: Props): React.ReactElement => {
	const { isShown, onRequestClose } = props
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const cvxPrice = useTokenPrice(TOKENS.CVX.ADDR);
	const bentCirculatingSupply = useBentCirculatingSupply();
	const bentStaked = useWeBentBentBalance();
	const vlCvxBalance = useVlCvxBalance();
	const votingPower = useVotingPower();

	const marketCap = () => {
		return utils.parseEther(bentPrice.toString()).mul(bentCirculatingSupply).div(BigNumber.from(10).pow(18))
	}

	return (
		<Modal
			isShown={isShown}
			title="Bent Market"
			onRequestClose={onRequestClose}
			onModalClose={() => {
				//
			}}
		>
			<ConnectContainer>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<span><b>BENT</b> Price:</span>
					<span className='ml-auto'>${bentPrice}</span>
				</FlexRow>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<span>Marketcap:</span>
					<span className='ml-auto'>${formatMillionsBigNumber(marketCap())}</span>
				</FlexRow>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<span>Circulating Supply:</span>
					<span className='ml-auto'>{formatBigNumber(bentCirculatingSupply, 18, 2)}</span>
				</FlexRow>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<span>Staked <b>BENT</b>:</span>
					<span className='ml-auto'>
						{formatBigNumber(bentStaked, 18, 2)}&nbsp;
						(${formatMillionsBigNumber(utils.parseEther(bentPrice.toString()).mul(bentStaked).div(BigNumber.from(10).pow(18)))})
					</span>
				</FlexRow>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<span>vlCVX:</span>
					<span className='ml-auto'>
						{formatBigNumber(vlCvxBalance, 18, 2)}&nbsp;
						(${formatMillionsBigNumber(utils.parseEther(cvxPrice.toString()).mul(vlCvxBalance).div(BigNumber.from(10).pow(18)))})
					</span>
				</FlexRow>
				<VotingPowerContainer>
					<span>Voting Power</span><br />
					<span className='ml-auto'>
						1 BENT (${bentPrice}) = {formatBigNumber(votingPower, 2, 2)} CVX (${formatBigNumber(utils.parseEther(cvxPrice.toString()).mul(votingPower), 20, 2)})
					</span>
				</VotingPowerContainer>
				<Splitter />
				<FlexRow>
					<IconContainer>
						<Icon iconSrc={cmcIcon} borderType="none" />
					</IconContainer>
					<IconContainer>
						<Icon iconSrc={cgcIcon} borderType="none" />
					</IconContainer>
					<IconContainer>
						<Icon iconSrc={mediumIcon} borderColor="#CAB8FF" />
					</IconContainer>
					<IconContainer>
						<Icon iconSrc={discordIcon} borderColor="#CAB8FF" />
					</IconContainer>
					<IconContainer>
						<Icon iconSrc={telegramIcon} borderColor="#CAB8FF" />
					</IconContainer>
				</FlexRow>
			</ConnectContainer>
		</Modal>
	)
}

const ConnectContainer = styled.div`
  text-align: center;
	width: 300px;
	font-size: 14px;

  h3 {
    font-weight: 500;
    font-size: 22px;
    line-height: 32px;
    margin: 8px auto;
  }

  p {
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
  }

  a {
    display: block;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Splitter = styled.div`
  opacity: 0.5;
  border: 1px solid #414C5C;
`

const FlexRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`

const VotingPowerContainer = styled.div`
	border-radius: 20px;
  border: 1px solid #4e4e4e;
	background: #80938621;
	backdrop-filter: blur(20px);
	text-align: center;
  padding: 15px;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
	cursor: pointer;
`