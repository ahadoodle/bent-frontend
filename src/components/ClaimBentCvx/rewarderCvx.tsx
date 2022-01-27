import React, { useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Card, CardBody, UncontrolledCollapse, CardText, Input
} from "reactstrap";
import {
	useBentCvxRewards,
	useBentCvxRewardsUsd,
	useBentCvxEarned,
	useBentCvxPoolApr,
	useBentCvxAprs,
	useTheme
} from "hooks";
import {
	formatBigNumber,
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import { DecimalSpan } from "components/DecimalSpan";
import CvxLogo from 'assets/images/cvx-logo-color-black.svg';
import CvxLogoLight from 'assets/images/cvx-logo-color.svg';
import BentLogo from 'assets/images/logo-dark.svg';
import BentLogoLight from 'assets/images/logo-light.svg';
import { ClaimBentCvxRewardItem } from "./item";
import { Theme } from "state/application/reducer";

interface Props {
	poolKey: string
	poolInfo: {
		Pool: string,
		RewardsAssets: string[],
		ClaimIndex: number[],
	}
	onClaimCheckChange: (key, indexes) => void
}

export const ClaimBentCvxRewarderCvx = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [checkAll, setCheckAll] = useState(false);
	const [claimChecked, setClaimChecked] = useState<Record<number, boolean>>({});
	const rewards = useBentCvxRewards(props.poolKey);
	const rewardsUsd = useBentCvxRewardsUsd(props.poolKey);
	const earned = useBentCvxEarned(props.poolKey);
	const apr = useBentCvxPoolApr(props.poolKey);
	const rewardAprs = useBentCvxAprs(props.poolKey);
	const theme = useTheme();

	const onClaimCheckChange = (index: number, add: boolean) => {
		if (!add) setCheckAll(false);
		claimChecked[props.poolInfo.ClaimIndex[index]] = add;
		setClaimChecked(Object.assign({}, claimChecked));
		if (Object.keys(claimChecked).filter(key => claimChecked[key]).length === props.poolInfo.RewardsAssets.length) {
			setCheckAll(true);
		}
		props.onClaimCheckChange(props.poolKey, claimChecked);
	}

	const onCheckAll = () => {
		props.poolInfo.RewardsAssets.forEach((key, index) => {
			claimChecked[props.poolInfo.ClaimIndex[index]] = !checkAll;
		})
		setClaimChecked(Object.assign({}, claimChecked));
		setCheckAll(!checkAll);
		// setCollapsed(!collapsed);
		props.onClaimCheckChange(props.poolKey, claimChecked);
	}

	return (
		<div className={`innerWrap p-0 rounded position-relative ${collapsed ? '' : 'open'}`} >
			<Wrapper
				className={`bentInner ${collapsed ? '' : 'open'}`}
				color="primary"
				id={`toggleInner-claim-bentCvx-${props.poolKey}`}
				onClick={() => setCollapsed(!collapsed)}
				collapsed={collapsed}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo
								src={props.poolKey === 'CVX' ?
									(theme === Theme.Dark ? CvxLogoLight : CvxLogo) :
									(theme === Theme.Dark ? BentLogoLight : BentLogo)}
								alt=""
							/>
							<h4>Earnings</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earned, 18, 2)} />
						</b>
					</Col>
					<Col>
						<b>
							{apr ? <>{utils.commify(apr)}%</> : 'TBC'}
						</b>
					</Col>
					<Col></Col>
					<Col>
						<div className="climBtn">
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
						</div>
					</Col>
				</Row>
			</Wrapper>
			<InnerWrapper
				className="innerAccordian"
				toggler={`#toggleInner-claim-bentCvx-${props.poolKey}`}
			>
				<Card className="splitter-horizontal" style={{ borderRadius: 0 }}>
					<CardBody className="p-1 converttabs">
						<Row className="align-items-center">
							<Col sm={12}>
								<CardText className="mt-0 mb-2">
									<span className="small">Breakdown of claimable earnings:</span>
								</CardText>
								<div className="bent-rewards-container">
									{props.poolInfo.RewardsAssets.map((key, index) =>
										<ClaimBentCvxRewardItem
											key={key}
											index={index}
											tokenKey={key}
											apr={rewardAprs[index] || 0}
											rewardUsd={rewardsUsd ? BigNumber.from(rewardsUsd[index] || ethers.constants.Zero) : ethers.constants.Zero}
											reward={rewards ? BigNumber.from(rewards[index] || ethers.constants.Zero) : ethers.constants.Zero}
											checked={claimChecked[props.poolInfo.ClaimIndex[index]] || false}
											onChange={onClaimCheckChange}
										/>
									)}
								</div>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</InnerWrapper>
			<div className="claimbtn-container">
				<Input type="checkbox" checked={checkAll} onChange={onCheckAll} onClick={(e) => e.stopPropagation()} />
			</div>
		</div>
	)
}

const PoolLogo = styled.img`
	max-width: 100px;
	height: 22px;
	margin: 12px 0;
`

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	padding: 10px;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;