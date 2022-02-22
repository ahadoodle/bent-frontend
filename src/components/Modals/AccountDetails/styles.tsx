import styled from 'styled-components'


export const AccountAvatar = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  margin-right: 8px;
`

export const accountLinkStyle = (props) => (`
	display: flex;
	align-items: center;
	justify-content: center;
  font-size: 14px;
  margin-right: 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  img {
    margin-right: 8px;
    min-height: 15px;
    min-width: 15px;
  }
`)

export const ChangeButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
  height: 40px;
  background: rgba(255,255,255,0.08);
  color: #FF7F57;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 23px;
	&:hover {
	}
`

export const Divider = styled.div`
  height: 1px;
  width: 150%;
  margin-left: -25%;
`

export const TransactionHistoryContainer = styled.div`
  text-align: left;
  margin-top: 24px;
  h4 {
    font-size: 16px;
    margin: 14px 0 4px;
  }
`

export const TransactionsList = styled.div`
  max-height: 160px;
  overflow-y: scroll;
`

export const Transaction = styled.div`
  height: 50px;
  padding: 12px 16px;
  margin: 4px 0px;
  font-size: 14px;
`

export const TransactionTitle = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    padding: 6px 15px;
    margin: -6px;
  }
`