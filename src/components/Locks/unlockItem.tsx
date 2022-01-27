import React from "react"
import styled from "styled-components";
import {
	Row, Col, Button
} from "reactstrap";
import { BigNumber, ethers, utils } from 'ethers';
import { TOKENS } from "constant"
import {
	useActiveWeb3React,
	useTokenPrice,
	useWeBentBentBalance,
	useWeBentContract,
	useWeBentTotalSupply,
} from "hooks";
import {
	formatBigNumber,
} from "utils";
import { DecimalSpan } from "components/DecimalSpan";

interface Props {
	unlockable: BigNumber
}

export const MyLockUnlockableItem = (props: Props): React.ReactElement => {
	const bentTotalStaked = useWeBentBentBalance();
	const weBentTotalSupply = useWeBentTotalSupply();
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const weBent = useWeBentContract();
	const { library } = useActiveWeb3React();

	const bentStaked = (): BigNumber => {
		return weBentTotalSupply.isZero() ?
			ethers.constants.Zero :
			BigNumber.from(bentTotalStaked).mul(props.unlockable).div(weBentTotalSupply);
	}

	const onWithdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		await weBent.connect(signer).withdraw(BigNumber.from(props.unlockable));
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
							<DecimalSpan value={formatBigNumber(props.unlockable, 18, 2)} /> weBENT
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
						<b>Unlocked</b>
					</Col>
					<Col>
						<b>Unlocked</b>
					</Col>
					<Col>
						<Button
							className="claimbtn btn btn-secondary"
							onClick={onWithdraw}
						>Withdraw</Button>
					</Col>
				</Row>
			</Wrapper>
		</div>
	)
}

const Wrapper = styled.div`
	cursor: pointer;
`;
