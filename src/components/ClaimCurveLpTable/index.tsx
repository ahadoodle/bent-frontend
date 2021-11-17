import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, UncontrolledCollapse, Card, Button, CardBody } from "reactstrap";
import { POOLS } from "constant";
// import { StakeCurveLpItem } from "./item";
import CrvLogo from 'assets/images/token/CRV.png';
import { ClaimCurveLpItem } from "./item";

export const ClaimCurveLpTable = (): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [totalEarning, setTotalEarning] = useState<number>();
	const earnings: number[] = [];
	const onEarningUpdate = (index, value) => {
		earnings[index] = value;
		let sum = 0;
		earnings.forEach(earning => sum += earning);
		setTotalEarning(sum);
	}

	return (
		<div className="cliamBlockOne">
			<div className="table-Responsive">
				<div className="toggleWrap tokentable">
					<div className="toggleWrap">
						<Wrapper
							className="bentPool mb-0"
							color="primary"
							id="togglerClaimBentPool"
							style={{ padding: "13px 15px" }}
							collapsed={collapsed}
							onClick={() => setCollapsed(!collapsed)}
						>
							<Row className="align-items-center">
								<Col>
									<div className="imgText">
										<img src={CrvLogo} alt="" width="28"/>
										<h2>Curve Pools</h2>
									</div>
								</Col>
								<Col>
									<div className="earnValue">
										<p>Earned (USD value)</p>
										<b>
											<span>$</span>{totalEarning}
										</b>
										<i
											className="fa fa-caret-down"
											aria-hidden="true"
										></i>
									</div>
								</Col>
								{/* <Col>
									<div className="earnValue">
										<p>Average APR</p>
										<b>
											-<span>%</span>
										</b>
									</div>
								</Col> */}
								<Col>
									<h3>Deposits</h3>
								</Col>
								<Col>
									<div className="clmBtn">
										<Button className="claimbtn">Claim All</Button>
										<i
											className="fa fa-caret-down"
											aria-hidden="true"
										></i>
									</div>
								</Col>
							</Row>
						</Wrapper>

						<UncontrolledCollapse
							toggler="#togglerClaimBentPool"
							className="bentpoolText"
						>
							<Card>
								<CardBody>
									{ Object.keys(POOLS.BentPools).map((poolName, index) =>
										<ClaimCurveLpItem
											poolInfo={POOLS.BentPools[poolName]}
											poolKey={poolName}
											key={poolName}
											// poolIndex={index}
											// updateEarning={onEarningUpdate}
										/>)
									}
								</CardBody>
							</Card>
						</UncontrolledCollapse>
					</div>
				</div>
			</div>
		</div>
	)
}

const Wrapper = styled.div<{collapsed : boolean }>`
	cursor: pointer;
	background: ${props => props.collapsed ? 'transparent' : '#B5DEFF !important'};
	border-radius: 8px;
`;