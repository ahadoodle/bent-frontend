import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  min-width: 375px;
  outline: 0;
`
export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #141625;
  opacity: 0.8;
  z-index: 500;
  backdrop-filter: blur(20px);
`
export const CloseButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 2px 4px;
  background: none;
  display: flex;
  :hover {
    cursor: pointer;
  }
  :active, :focus {
    outline: none;
    border: none;
  }
`
export const Content = styled.div`
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;
`
