import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
  transition: 0.5s;
`
interface ITextStatus {
  show : boolean,
  className : string,
  label : string
}

const TextStatus : React.FC<ITextStatus> = ({ show, className, label }) => {
  return (
    <Span className={className + (show ? '' : ' invisible')}>{label}</Span>
  )
}

export default TextStatus
