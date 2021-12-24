import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber, getSumBigNumbers } from "utils";
import { useCrvAverageApr, useCrvPoolDepositedUsds, useCrvPoolEarns, useCrvTvls, useSortedCrvPoolKeys } from "hooks";
import { MorePoolsRow } from "components/MorePoolsRow";
import { SwitchSlider } from "components/Switch";
import { StakeBentCvxCurveLpItem } from "./bentcvxItem";
import { utils } from "ethers";

export const StakeCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [sortField, setSortField] = useState('');
	const [sortOrder, setSortOrder] = useState(1);
	const tvls = useCrvTvls();
	const earns = useCrvPoolEarns();
	const depostedUsd = useCrvPoolDepositedUsds();
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
									{formatBigNumber(getSumBigNumbers(earns), 18, 2).split('.')[0]}.
									<span className="small">{formatBigNumber(getSumBigNumbers(earns), 18, 2).split('.')[1]}</span>
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
									{formatBigNumber(getSumBigNumbers(depostedUsd), 18, 2).split('.')[0]}.
									<span className="small">{formatBigNumber(getSumBigNumbers(depostedUsd), 18, 2).split('.')[1]}</span>
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col onClick={() => onSort('tvl')} className={sortOrderClass('tvl')}>
								<span className="small">
									TVL
								</span><br />
								<b>
									<span className="small">$</span>
									{formatMillionsBigNumber(getSumBigNumbers(tvls), 18, 2)}
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