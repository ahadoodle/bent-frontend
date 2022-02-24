import React, { useState } from "react";
import {
	Container, Row, Col, Card, CardBody, CardText, Input, Button, UncontrolledTooltip
} from "reactstrap";
import { ethers, utils } from "ethers";
import { bentFinanceHex, getEtherscanLink } from "utils";
import { useActiveWeb3React, useDelegationAddr, useSnapshot } from "hooks";
import styled from "styled-components";
import { POOLS } from "constant";

export const DelegateVote = (): React.ReactElement => {
	const [isShowChange, showChange] = useState<boolean>(false);
	const [delegateAddr, setDelegateAddr] = useState('');
	const delegatedAddr = useDelegationAddr();
	const { library } = useActiveWeb3React();
	const snapshot = useSnapshot();

	const onDelegateToBent = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await snapshot.connect(signer).setDelegate(bentFinanceHex, POOLS.SnapshotDelegation.BentDelegator);
		await tx.wait();
	}

	const onDelegate = async () => {
		if (!library || !utils.isAddress(delegateAddr)) return;
		const signer = await library.getSigner();
		const tx = await snapshot.connect(signer).setDelegate(bentFinanceHex, delegateAddr);
		await tx.wait();
	}

	const onClearDelegate = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await snapshot.connect(signer).clearDelegate(bentFinanceHex);
		await tx.wait();
	}

	return (
		<Container className="stake-bent">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead">
								<Col className="px-0">
									<div className="imgText d-flex">
										<h2>Delegate vote weight</h2>
										<div style={{ margin: 'auto', marginLeft: 5 }}>
											<i className="fa fa-info-circle cursor-pointer" id="voting-delegate" aria-hidden="true" />
											<UncontrolledTooltip target="voting-delegate" className="bent-details" placement="bottom">
												<div style={{ padding: 15, lineHeight: '18px' }}>
													You can delegate your weBENT voting power to any ethereum address or the Bent team.
												</div>
											</UncontrolledTooltip>
										</div>
									</div>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											{
												delegatedAddr === ethers.constants.AddressZero ?
													<Row>
														<Col>
															<CardText className="mt-0">
																<span className="small">You are not delegating your vote</span>
															</CardText>
															<Row>
																<button className="btn btnshow" style={{ margin: 'unset' }} onClick={onDelegateToBent}>
																	Delegate to Bent
																</button>
																<Splitter />
																<Col>
																	<div className="amountinput">
																		<Input
																			type="text" placeholder="Delegate to any address"
																			style={{ paddingLeft: 12 }}
																		// onChange={(e) => onLockAmountChange(e.target.value)}
																		// value={lockAmount}
																		/>
																		<Button className="maxbtn" >Delegate</Button>
																	</div>
																</Col>
															</Row>
														</Col>
													</Row>
													: <Row>
														<Col>
															<CardText className="mt-0">
																<span className="small">
																	You are currently delegating to:&nbsp;
																	<a href={getEtherscanLink(delegatedAddr)} target="_blank" rel="noreferrer" className="contract-address">
																		{delegatedAddr === POOLS.SnapshotDelegation.BentDelegator ? 'bentvote.eth (Bent Team)' : delegatedAddr}
																	</a></span>
															</CardText>
															{
																isShowChange ?
																	<Row>
																		<button className="btn btnshow error" style={{ margin: '0 12px' }} onClick={onClearDelegate}>
																			Clear Delegate
																		</button>
																		<button
																			className="btn btnshow"
																			style={{ margin: '0 12px' }}
																			onClick={onDelegateToBent}
																			disabled={delegatedAddr === POOLS.SnapshotDelegation.BentDelegator}
																		>
																			Delegate to Bent
																		</button>
																		<Splitter />
																		<Col>
																			<div className="amountinput">
																				<Input
																					type="text" placeholder="Delegate to any address"
																					style={{ paddingLeft: 12 }}
																					onChange={(e) => setDelegateAddr(e.target.value)}
																					value={delegateAddr}
																				/>
																				<Button className="maxbtn" onClick={onDelegate}>Delegate</Button>
																			</div>
																		</Col>
																	</Row>
																	: <Row>
																		<button className="btn btnshow error" style={{ margin: '0 12px' }} onClick={onClearDelegate}>
																			Clear Delegate
																		</button>
																		<button
																			className="btn btnshow"
																			style={{ margin: '0 12px' }}
																			onClick={() => showChange(true)}
																		>Change Delegate</button>
																	</Row>
															}
														</Col>
													</Row>
											}
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

const Splitter = styled.div`
	width: 1px;
	height: 40px;
	background: #677389;
	margin: 0 40px;
	padding: 0;
`;