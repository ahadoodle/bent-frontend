import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS, TOKEN_LOGO } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber } from "utils";
import { useCrvAverageApr, useCrvPoolTotalDepositedUsds, useCrvPoolTotalEarned, useCrvTotalTvl, useSortedCrvPoolKeys } from "hooks";
import { MorePoolsRow } from "components/MorePoolsRow";
import { StakeBentCvxCurveLpItem } from "./bentcvxItem";
import { utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import { SearchBox } from "components/SearchBox";

export const StakeCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const [searchField, setSearchField] = useState('');

	const [sortField, setSortField] = useState('apr');
	const [sortOrder, setSortOrder] = useState(-1);
	const tvl = useCrvTotalTvl();
	const earn = useCrvPoolTotalEarned();
	const depostedUsd = useCrvPoolTotalDepositedUsds();
	const avgApr = useCrvAverageApr();
	const keys = useSortedCrvPoolKeys(sortField, sortOrder, searchField);

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
						<SearchBox className="ml-auto" onChange={value => setSearchField(value)} />
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
								{keys.map((poolName, index) =>
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
								{
									keys.length === 0 && <div className="text-white text-center p-3">
										No results for "{searchField}"
									</div>
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