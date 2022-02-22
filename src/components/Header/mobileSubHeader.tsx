import React from "react";
import styled from "styled-components";
import GasIcon from "assets/images/gas.svg";
import { useIsMobile } from "hooks";
import { Navbar } from "reactstrap";
import ConnectWallet from "components/ConnectWallet";

export const MobileSubHeader = (): React.ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Container style={!isMobile && { display: 'none' }}>
      <GasContainer>
        <img src={GasIcon} alt="Menu" /> 61
      </GasContainer>
      <ConnectWallet />
    </Container>
  )
}

const Container = styled(Navbar)`
  background: #171E29;
  border: 1px solid #1E2735;
  border-radius: 34px;
  padding: 10px 0;
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