import React, { useState } from "react";
import styled from "styled-components";
import GasIcon from "assets/images/gas.svg";
import AccountIcon from "assets/images/account.svg";
import { useEthers, useIsMobile } from "hooks";
import { Navbar } from "reactstrap";
import { formatAddress } from "utils";
import ConnectWallet from "components/ConnectWallet";

export const MobileSubHeader = (): React.ReactElement => {
	const isMobile = useIsMobile();
	const { account } = useEthers();
	return (
		<Container mobile={isMobile}>
			<GasContainer>
				<img src={GasIcon} alt="Menu" /> 61
			</GasContainer>
			{/* <AccountContainer>
				<img src={AccountIcon} alt="Menu" />
				<span className="mt-1">{formatAddress(account || '')}</span>
			</AccountContainer> */}
			<ConnectWallet />
		</Container>
	)
}

const Container = styled(Navbar) <{ mobile: boolean }>`
  background: #171E29;
  border: 1px solid #1E2735;
  border-radius: 34px;
  padding: 10px 0;
	${props => !props.mobile && 'display: none;'}
`

const GasContainer = styled.div`
  background: #242B37;
  border-radius: 13px;
  padding: 10px;
  color: #B5DEFF;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.24px;
`;

const AccountContainer = styled.div`
  margin-left: auto;
	margin-right: 20px;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	letter-spacing: -0.24px;

	color: #FAFAFA;
`
