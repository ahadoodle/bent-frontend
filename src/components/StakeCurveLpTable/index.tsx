import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS, TOKEN_LOGO } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber } from "utils";
import { useCrvAverageApr, useCrvPoolTotalDepositedUsds, useCrvPoolTotalEarned, useCrvTotalTvl, useHasLegacyCrvDeposit, useSortedCrvPoolKeys } from "hooks";
import { MorePoolsRow } from "components/MorePoolsRow";
import { SwitchSlider } from "components/Switch";
import { StakeBentCvxCurveLpItem } from "./bentcvxItem";
import { utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";

export const StakeCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const [showNew, setShowNew] = useState(true);
	const [sortField, setSortField] = useState('apr');
	const [sortOrder, setSortOrder] = useState(-1);
	const tvl = useCrvTotalTvl();
	const earn = useCrvPoolTotalEarned();
	const depostedUsd = useCrvPoolTotalDepositedUsds();
	const avgApr = useCrvAverageApr();
	const keys = useSortedCrvPoolKeys(sortField, sortOrder);
	const hasOldDeposits = useHasLegacyCrvDeposit();

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
							className={`ml-auto ${hasOldDeposits ? '' : 'd-none'}`}
							defaultValue={true}
							onChange={showNew => setShowNew(showNew)}
						/>
					</div>
					<div className="toggleWrap tokentable table sortable">
						<Row className="align-items-center thead">
							<Col onClick={() => onSort('name')} className={`${sortOrderClass('name')} pl-0`}>
								<div className="imgText">
									<img src={TOKEN_LOGO.CRV} alt="" width="28" />
									<h2>
										Pool Name&nbsp;
										<i className="fa fa-caret-down" aria-hidden="true" />
									</h2>
								</div>
							</Col>
							<Col onClick={() => onSort('earned')} className={sortOrderClass('earned')}>
								<div>
									<span className="small p-0">Total Earned (USD)</span><br />
									<b className="p-0">
										<span className="small">$</span>
										<DecimalSpan value={formatBigNumber(earn, 18, 2)} />
										&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
									</b>
								</div>
							</Col>
							<Col onClick={() => onSort('apr')} className={sortOrderClass('apr')}>
								<div>
									<span className="small p-0">My Average APR</span><br />
									<b className="p-0">
										{avgApr ? <>{utils.commify(avgApr.toFixed(2))}%</> : 'TBC'}
										&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
									</b>
								</div>
							</Col>
							<Col onClick={() => onSort('deposit')} className={sortOrderClass('deposit')}>
								<div>
									<span className="small p-0">My Total Deposits</span><br />
									<b className="p-0">
										<span className="small">$</span>
										<DecimalSpan value={formatBigNumber(depostedUsd, 18, 2)} />
										&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
									</b>
								</div>
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
								{keys.filter(key => (showNew || !hasOldDeposits) ? !POOLS.BentPools[key].isLegacy : POOLS.BentPools[key].isLegacy).map((poolName, index) =>
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
								<MorePoolsRow onShowMore={() => setShowAll(true)} visible={!showAll} title="More Pools" />
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}