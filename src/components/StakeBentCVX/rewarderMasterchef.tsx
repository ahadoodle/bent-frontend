import React, { useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Input, Button
} from "reactstrap";
import { DecimalSpan } from "components/DecimalSpan";
import { BigNumber, ethers, utils } from 'ethers';
import { TOKENS } from "constant";
import { useActiveWeb3React, useBentCvxEarned, useBentCvxPoolApr, useBentCvxRewarderMCContract, useBentCvxRewards } from "hooks";
import { formatBigNumber } from "utils";

interface Props {
	poolKey: string
	poolInfo: {
		Pool: string,
		RewardsAssets: string[],
	}
	onClaimCheckChange: (key, indexes) => void
	old?: boolean;
}

export const ClaimBentCvxRewarderMasterChef = (props: Props): React.ReactElement => {
	const [claimChecked, setClaimChecked] = useState<boolean>(false);
	const earned = useBentCvxEarned(props.poolKey);
	const rewards = useBentCvxRewards(props.poolKey);
	const apr = useBentCvxPoolApr(props.poolKey);
	const { library } = useActiveWeb3React();
	const bentCvxRewarderMC = useBentCvxRewarderMCContract(true);

	const onClaimCheckChange = () => {
		setClaimChecked(!claimChecked);
		props.onClaimCheckChange(props.poolKey, { '0': !claimChecked });
	}

	const onClaimOld = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const address = await signer.getAddress();
		const tx = await bentCvxRewarderMC.connect(signer).claim(address, [0]);
		await tx.wait();
	}

	return (
		<div className={`innerWrap p-0 rounded position-relative`} >
			<Wrapper
				className={`bentInner`}
				color="primary"
				id={`toggleInner-claim-bentCvx-${props.poolKey}`}
				collapsed={false}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo src={TOKENS.BENT.LOGO} alt="" />
							<h4>BENT {props.old && '(Old)'}</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earned, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{formatBigNumber(BigNumber.from(rewards.length ? rewards[0] : ethers.constants.Zero), 18, 2)} BENT
						</span>
					</Col>
					<Col>
						<b>
							{apr ? <>{utils.commify(apr.toFixed(2))}%</> : 'TBC'}
						</b>
					</Col>
					<Col></Col>
					<Col>
						{props.old && <ClaimButton
							onClick={onClaimOld}
							className="approvebtn"
						>Claim</ClaimButton>}
					</Col>
				</Row>
			</Wrapper>
			{!props.old && <div className="checkall-container">
				<Input type="checkbox" checked={claimChecked} onChange={onClaimCheckChange} />
			</div>}
		</div>
	)
}

const PoolLogo = styled.img`
	max-width: 100px;
	height: 28px;
`

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	padding: 10px;
`;

const ClaimButton = styled(Button)`
	margin-left: 20px;
	height: 42px;
	width: 150px;
`