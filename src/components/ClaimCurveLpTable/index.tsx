import React, { useState } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { POOLS } from "constant";
import CrvLogo from 'assets/images/token/CRV.svg';
import { ClaimCurveLpItem } from "./item";
import { useCrvPoolTotalDepositedUsds, useCrvAverageApr, useSortedCrvPoolKeys, useCrvPoolTotalEarned, useHasLegacyCrvDeposit } from "hooks";
import { formatBigNumber } from "utils";
import { MorePoolsRow } from "components/MorePoolsRow";
import { DecimalSpan } from "components/DecimalSpan";
import { SwitchSlider } from "components/Switch";
import { ClaimBentCvxCurveLpItem } from "./bentcvxItem";
import { utils } from "ethers";

export const ClaimCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const [showNew, setShowNew] = useState(true);
	const [sortField, setSortField] = useState('apr');
	const [sortOrder, setSortOrder] = useState(-1);
	const earns = useCrvPoolTotalEarned();
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
		<Container className="mt-5">
			<Row>
				<Col md="12">
					<div className="toggleWrap tokentable table sortable">
						<Row className="align-items-center thead p-0 pt-2 pb-2">
							<Col onClick={() => onSort('name')} className={sortOrderClass('name')}>
								<div className="imgText">
									<img src={CrvLogo} alt="" width="28" />
									<h2>Curve Pools</h2>
								</div>
							</Col>
							<Col onClick={() => onSort('earned')} className={sortOrderClass('earned')}>
								<span className="small">
									Total Earned (USD)
								</span><br />
								<b>
									<span className="small">$</span>
									<DecimalSpan value={formatBigNumber(earns, 18, 2)} />
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col onClick={() => onSort('apr')} className={sortOrderClass('apr')}>
								<span className="small p-0">My Average APR</span><br />
								<b className="p-0">
									{avgApr ? <>{utils.commify(avgApr)}%</> : 'TBC'}
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
							<Col>
								<div className="clmBtn">
									<SwitchSlider
										label="V2 Pools"
										className={hasOldDeposits ? '' : 'd-none'}
										labelClassName="text-black"
										defaultValue={true}
										onChange={showNew => setShowNew(showNew)}
									/>
									{/* <Button className="claimbtn">Claim All</Button>
										<i
											className="fa fa-caret-down"
											aria-hidden="true"
										></i> */}
								</div>
							</Col>
						</Row>
						<Card>
							<CardBody>
								{keys.filter(key => (showNew || !hasOldDeposits) ? !POOLS.BentPools[key].isLegacy : POOLS.BentPools[key].isLegacy).map((poolName, index) =>
									POOLS.BentPools[poolName].isBentCvx ?
										<ClaimBentCvxCurveLpItem
											poolInfo={POOLS.BentPools[poolName]}
											poolKey={poolName}
											key={poolName}
											visible={index < 5 || showAll}
										/> :
										<ClaimCurveLpItem
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