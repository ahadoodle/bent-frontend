import React from "react"
import styled from "styled-components";
import {
	Row, Col
} from "reactstrap";
import { BigNumber, ethers, utils } from 'ethers';
import { TOKENS } from "constant"
import {
	useTokenPrice,
	useWeBentBentBalance,
	useWeBentLockDuration,
	useWeBentTotalSupply,
} from "hooks";
import {
	formatBigNumber,
} from "utils";
import { DecimalSpan } from "components/DecimalSpan";
import { WeBentLockedData } from "state/contracts/reducer";


interface Props {
	lockedData: WeBentLockedData
}

export const MyLockItem = (props: Props): React.ReactElement => {
	const bentTotalStaked = useWeBentBentBalance();
	const weBentTotalSupply = useWeBentTotalSupply();
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const lockDuration = useWeBentLockDuration();

	const bentStaked = (): BigNumber => {
		return weBentTotalSupply.isZero() ?
			ethers.constants.Zero :
			BigNumber.from(bentTotalStaked).mul(props.lockedData.amount).div(weBentTotalSupply);
	}

	const unlockDate = () => {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const date = new Date(lockDuration.add(props.lockedData.unlockAt).toNumber() * 1000);
		return `${months[date.getMonth()]} ${date.getDate()}`
	}

	const remaining = () => {
		const oneDay = 60 * 60 * 24;
		const days = Math.floor((lockDuration.add(props.lockedData.unlockAt).toNumber() - Date.now() / 1000) / oneDay);
		const week = days >= 7 ? `${(Math.floor(days / 7))} week${days / 7 >= 2 ? 's  ' : '  '}` : '';
		const day = days % 7 === 0 ? '' : `${days % 7} day${days % 7 > 1 ? 's' : ''}`;
		return week + day;
	}

	return (
		<div className={`innerWrap p-0 rounded`}>
			<Wrapper
				className={`bentInner`}
				color="primary"
				id={`toggleInner-weBent-locked`}
				style={{ marginBottom: "1rem" }}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<b>
							<DecimalSpan value={formatBigNumber(props.lockedData.amount, 18, 2)} /> weBENT
						</b><br />
						<span className="small text-muted">
							{formatBigNumber(bentStaked(), 18, 2)} BENT
						</span>
					</Col>
					<Col>
						<div className="tvlText">
							<b>
								<span className="small">$</span>
								{formatBigNumber(utils.parseEther(bentPrice.toString()).mul(bentStaked()).div(BigNumber.from(10).pow(18)), 18, 2)}
							</b>
						</div>
					</Col>
					<Col>
						<b>
							{remaining()}
						</b>
					</Col>
					<Col>
						<b>
							{unlockDate()}
						</b>
					</Col>
					<Col>
					</Col>
				</Row>
			</Wrapper>
		</div>
	)
}

const Wrapper = styled.div`
	cursor: pointer;
`;
