import React from 'react'
import styled from 'styled-components'

const DefaultHeader = styled.h1`
  font-family: 'Inconsolata', monospace;
`

const StyledHeader = styled(DefaultHeader)`
  color: white;
  font-family: 'Inconsolata', monospace;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
`

const Hr = styled.hr`
  color: white;
  width: 80%;
`

const Div = styled.div`
  padding: 10px;
  background-color: #282c34;
  padding-bottom: 30px;
  padding-top: 30px;
`

const StyledSubtitle = styled.h3`
  color: white;
  font-family: 'Inconsolata', monospace;
  font-size: 1.1em;
  text-align: center;
  font-weight: none;
  font-style: italic;
`

interface IHeader {
  title : string,
  subtitle : string
}

const Header : React.FC<IHeader> = ({ title, subtitle }) => {
  return (
    <Div>
      <StyledHeader>{title}</StyledHeader>
      <Hr/>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </Div>
  )
}

export default Header