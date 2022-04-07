import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { TOKEN_LOGO } from "constant";
import { useVoters } from "hooks";
import { VoteInfluencerItem } from "./item";

export const VoteInfluencerTable = (): React.ReactElement => {
	const voters = useVoters();
	const onSort = (field) => {
		// 
	}
	const sortOrderClass = (field) => {
		// 
		return '';
	}
	return <Container className="stake-bent">
		<Row>
			<Col md="12">
				<div className="convert-up">
					<h2 className="section-header">Bent DAO</h2>
				</div>
				<div className="toggleWrap tokentable table sortable">
					<Row className="align-items-center thead">
						<Col
							onClick={() => onSort('name')}
							className={`pl-0`}
							style={{ flex: '1.3 0' }}
						>
							<div className="imgText">
								<img src={TOKEN_LOGO.BENT} alt="" width="28" />
								<h2>
									Voter&nbsp;
									<i className="fa fa-caret-down" aria-hidden="true" />
								</h2>
							</div>
						</Col>
						<Col
							onClick={() => onSort('earned')}
							className={sortOrderClass('earned')}
							style={{ flex: '0.7 0' }}
						>
							<div>
								<b className="p-0">Voting Power</b>
							</div>
						</Col>
					</Row>
					<Card>
						<CardBody>
							{voters.map(vote =>
								<VoteInfluencerItem voter={vote} key={vote.id} />
							)}
						</CardBody>
					</Card>
				</div>
			</Col>
		</Row>
	</Container>;
}