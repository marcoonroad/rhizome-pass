import React from 'react'
import styled from 'styled-components'

const DefaultButton = styled.button`
background-color: #4CAF50;
border: none;
color: white;
padding: 12px 24px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
border-radius: 5px;
`

const DefaultOutput = styled.input`
background-color: white;
border: none;
color: #4CAF50;
padding: 12px 24px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
border-radius: 5px;
`

const DefaultLabel = styled.label`
  color: white;
  font-family: 'Inconsolata', monospace;
  display: inline-block;
  padding: 0.75em;

  display: block !important;
`

const Label = DefaultLabel

const Button = styled(DefaultButton)`
  border-radius: 0px 5px 5px 0px;
  width: 25%;
  display: block;
`

const StyledOutput = styled(DefaultOutput)`
  border-radius: 5px 0px 0px 5px;
  width: 75%;
  display: block;
`

interface IOutput {
  value : string,
  className : string,
  label : string,
  labelId : string
}

const Output : React.FC<IOutput> = ({ value, className, label, labelId }) => {
  const copyContent = (event : any) => {
    event.preventDefault()

    return navigator.clipboard.writeText(value)
  }

  return (
    <div className={`${className}`}>
      <Label htmlFor={labelId}>{label}</Label>
      <div className={'horizontal-stack'}>
        <StyledOutput
          id={labelId}
          readOnly
          value={value} />
        <Button
          onClick={copyContent}>COPY</Button>
      </div>
    </div>
  )
}

const PublicOutput = styled(Output)`
`

export default React.memo(PublicOutput)
