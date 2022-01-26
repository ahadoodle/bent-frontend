import React from "react";
import {
	Container, Row, Col, Card, CardBody
} from "reactstrap";
import { TOKENS, TOKEN_LOGO } from "constant";
import { MyLockItem } from "./item";
import { useWeBentLockedData, useWeBentLocked, useTokenPrice, useWeBentUnlockable } from "hooks";
import { BigNumber, utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import { formatBigNumber } from "utils";
import { MyLockUnlockableItem } from "./unlockItem";
import VoteIcon from 'assets/images/vote.svg';

export const MyLocksTable = (): React.ReactElement => {
	const lockedData = useWeBentLockedData();
	const weBentBent = useWeBentLocked();
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const unlockable = useWeBentUnlockable();

	const onVote = () => {
		window.open('https://snapshot.org/#/bentfinance.eth', '_blank');
	}

	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<h2 className="section-header">Your Locks</h2>
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead">
							<Col className="px-0">
								<div className="imgText">
									<img src={TOKEN_LOGO.BENT} alt="" width="28" />
									<h2>weBENT</h2>
								</div>
							</Col>
							<Col>
								<div>
									<span className="small p-0">Value (USD)</span><br />
									<b className="p-0">
										<span className="small">$</span>
										<DecimalSpan value={formatBigNumber(utils.parseEther(bentPrice.toString()).mul(weBentBent), 18 * 2, 2)} />
										&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
									</b>
								</div>
							</Col>
							<Col>
								Lock Remaining
							</Col>
							<Col>
								Unlock Date
							</Col>
							<Col>
								Action
							</Col>
						</Row>
						<Card>
							<CardBody>
								{!unlockable.isZero() &&
									<MyLockUnlockableItem unlockable={unlockable} />
								}
								{lockedData.map((lockedData, index) =>
									lockedData.amount && !BigNumber.from(lockedData.amount).isZero() &&
									<MyLockItem
										key={index}
										lockedData={lockedData}
									/>
								)}
								<div className={`innerWrap p-0 rounded`} >
									<div className="text-center btnwrap">
										<button className="btn btnshow" onClick={onVote}>
											<img src={VoteIcon} alt="VoteLogo" />&nbsp;Go to vote page
										</button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}