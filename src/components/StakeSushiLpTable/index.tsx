import React from "react";
import {
	Container, Row, Col, Card, CardBody
} from "reactstrap";
import { POOLS } from "constant";
import { StakeSushiLpItem } from "./item";
import { useSushiPoolTotalEarned, useSushiTotalTvl } from "hooks";
import { formatBigNumber, formatMillionsBigNumber } from "utils";

export const StakeSushiLpTable = (): React.ReactElement => {
	const totalEarns = useSushiPoolTotalEarned();
	const totalTvl = useSushiTotalTvl();
	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<h2 className="black">Provide liquidity on SushiSwap</h2>
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead">
							<Col>
								Pool Name{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Col>
							<Col>
								<span className="small p-0">
									Earned (USD)&nbsp;
									<i className="fa fa-caret-down" aria-hidden="true" />
								</span><br />
								<b className="p-0">
									<span className="small">$</span>
									<span className="h5">{formatBigNumber(totalEarns)}</span>
								</b>
							</Col>
							<Col>
								APR{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Col>
							<Col>
								My Staked Balances{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Col>
							<Col>
								<span className="small">
									TVL&nbsp;
									<i className="fa fa-caret-down" aria-hidden="true" />
								</span><br />
								<b>
									<span className="small">$</span>
									<span className="h5">{formatMillionsBigNumber(totalTvl, 18, 0)}</span>
								</b>
							</Col>
						</Row>
						<Card>
							<CardBody>
								{Object.keys(POOLS.SushiPools.Pools).map((poolName, index) =>
									<StakeSushiLpItem poolInfo={POOLS.SushiPools.Pools[poolName]} poolKey={poolName} key={index} />
								)}
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}