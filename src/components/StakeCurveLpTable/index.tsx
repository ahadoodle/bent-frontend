import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber } from "utils";
import { useCrvAverageApr, useCrvPoolTotalDepositedUsds, useCrvPoolTotalEarned, useCrvTotalTvl, useSortedCrvPoolKeys } from "hooks";
import { MorePoolsRow } from "components/MorePoolsRow";
import { SwitchSlider } from "components/Switch";
import { StakeBentCvxCurveLpItem } from "./bentcvxItem";
import { utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";

export const StakeCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const [showNew, setShowNew] = useState(true);
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState(1);
	const tvl = useCrvTotalTvl();
	const earn = useCrvPoolTotalEarned();
	const depostedUsd = useCrvPoolTotalDepositedUsds();
	const avgApr = useCrvAverageApr();
	const keys = useSortedCrvPoolKeys(sortField, sortOrder);

	const onSort = (field: string) => {
		if (field === sortField) {
			setSortOrder(sortOrder * -1);
		} else {
			setSortField(field);
			setSortOrder(1);
		}
	}

	const sortOrderClass = (field) => {
		return sortField === field ? (sortOrder === 1 ? 'desc' : 'asc') : '';
	}

	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<div className="d-flex">
						<h2 className="section-header">Stake Curve LP Tokens</h2>
						<SwitchSlider
							label="V2 Pools"
							className="ml-auto"
							defaultValue={true}
							onChange={showNew => setShowNew(showNew)}
						/>
					</div>
					<div className="toggleWrap tokentable table sortable">
						<Row className="align-items-center thead">
							<Col onClick={() => onSort('name')} className={sortOrderClass('name')}>
								Pool Name{" "}
								<i className="fa fa-caret-down" aria-hidden="true" />
							</Col>
							<Col onClick={() => onSort('earned')} className={sortOrderClass('earned')}>
								<span className="small p-0">Total Earned (USD)</span><br />
								<b className="p-0">
									<span className="small">$</span>
									<DecimalSpan value={formatBigNumber(earn, 18, 2)} />
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col onClick={() => onSort('apr')} className={sortOrderClass('apr')}>
								<span className="small p-0">My Average APR</span><br />
								<b className="p-0">
									{utils.commify(avgApr)}%
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col onClick={() => onSort('deposit')} className={sortOrderClass('deposit')}>
								<span className="small p-0">My Total Deposits</span><br />
								<b className="p-0">
									<span className="small">$</span>
									<DecimalSpan value={formatBigNumber(depostedUsd, 18, 2)} />
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col onClick={() => onSort('tvl')} className={sortOrderClass('tvl')}>
								<span className="small">
									TVL
								</span><br />
								<b>
									<span className="small">$</span>
									{formatMillionsBigNumber(tvl, 18, 2)}
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
						</Row>
						<Card>
							<CardBody>
								{keys.filter(key => showNew ? !POOLS.BentPools[key].isLegacy : POOLS.BentPools[key].isLegacy).map((poolName, index) =>
									POOLS.BentPools[poolName].isBentCvx ?
										<StakeBentCvxCurveLpItem
											poolInfo={POOLS.BentPools[poolName]}
											poolKey={poolName}
											key={poolName}
											visible={index < 5 || showAll}
										/> :
										<StakeCurveLpItem
											poolInfo={POOLS.BentPools[poolName]}
											poolKey={poolName}
											key={poolName}
											visible={index < 5 || showAll}
										/>)
								}
								<MorePoolsRow onShowMore={() => setShowAll(true)} visible={!showAll} />
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}