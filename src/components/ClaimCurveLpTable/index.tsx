import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, UncontrolledCollapse, Card, Button, CardBody } from "reactstrap";
import { POOLS } from "constant";
// import { StakeCurveLpItem } from "./item";
import BentLogo from 'assets/images/token/BENT.png';
import { ClaimCurveLpItem } from "./item";

export const ClaimCurveLpTable = (): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);

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
										<img src={BentLogo} alt="" width="28"/>
										<h2>Bent Pools</h2>
									</div>
								</Col>
								<Col>
									<div className="earnValue">
										<p>Earned (USD value)</p>
										<b>
											<span>$</span>0
										</b>
										<i
											className="fa fa-caret-down"
											aria-hidden="true"
										></i>
									</div>
								</Col>
								<Col>
									<div className="earnValue">
										<p>Average APR</p>
										<b>
											-<span>%</span>
										</b>
									</div>
								</Col>
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
									{ Object.keys(POOLS.BentPools).map(poolName =>
										<ClaimCurveLpItem poolInfo={POOLS.BentPools[poolName]} poolKey={poolName} key={poolName} />)
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