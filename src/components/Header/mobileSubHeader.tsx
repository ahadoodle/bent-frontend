import React from "react";
import styled from "styled-components";
import GasIcon from "assets/images/gas.svg";
import { useGasPrice, useIsMobile } from "hooks";
import ConnectWallet from "components/ConnectWallet";
import { formatBigNumber } from "utils";

export const MobileSubHeader = (): React.ReactElement => {
  const isMobile = useIsMobile();
  const gasPrice = useGasPrice();
  return (
    <Container mobile={isMobile}>
      <GasContainer>
        <img src={GasIcon} alt="Menu" style={{ width: 13 }} /> {formatBigNumber(gasPrice, 9, 1)}
      </GasContainer>
      <ConnectWallet />
    </Container>
  )
}

const Container = styled.div<{ mobile: boolean }>`
  display: ${props => props.mobile ? 'flex' : 'none'};
  background: #171e2963;
  border: 1px solid #1E2735;
  border-radius: 34px;
  padding: 10px;
  margin-bottom: 10px;
`

const GasContainer = styled.div`
  background: #242b3747;
  border: 1px solid #242B37;
  border-radius: 13px;
  padding: 10px;
  color: #B5DEFF;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.24px;
  margin-right: auto;
`;