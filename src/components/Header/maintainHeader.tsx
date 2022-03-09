import React from 'react';
import { Container, Navbar } from 'reactstrap';
import MaintainIcon from 'assets/images/maintain.svg';
import { useIsMobile } from 'hooks';

export const MaintainHeader = (): React.ReactElement => {
	console.log(process.env.REACT_APP_MAINTENANCE);
	const isMobile = useIsMobile();
	return (
		<div className={`maintain-header ${process.env.REACT_APP_MAINTENANCE !== 'true' && 'd-none'}`} style={isMobile ? { top: 131 } : {}}>
			<Container>
				<Navbar light expand="md">
					<img src={MaintainIcon} alt="" width={30} />
					<div style={{
						marginLeft: 10,
						marginRight: 'auto',
						fontWeight: 500,
						fontSize: isMobile ? 10 : 'unset'
					}}>
						Platform is currently under maintenance...{isMobile && <br />} your funds are SAFE
					</div>
				</Navbar>
			</Container>
		</div>
	)
}