import React from 'react'
import styled from 'styled-components'

const DefaultLabel = styled.label`
  color: white;
  font-family: 'Inconsolata', monospace;
  display: inline-block;
  padding: 0.75em;

  display: block !important;
`

const DefaultInput = styled.input`
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

const Label = DefaultLabel

const Input = styled(DefaultInput)`
  margin: 0 auto;
  display: block;
  width: 100%;
`


interface IOptions {
  label : string,
  values : Array<string>,
  optionsId : string,
  className : string,
  customRef : React.RefObject<HTMLInputElement>
}

/*
const Select = styled.select`
background-color: #4CAF50;
border: none;
color: white;
padding: 12px 24px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
`

const Option = styled.option`
padding: 12px 24px;
text-align: center;
font-size: 16px;
`
*/

const asKey = (value : string) => value.toLowerCase().replace(/\s/g, '-')
const asOption = (value : string) =>
  <option value={value} key={asKey(value)}>{value}</option>

const Options : React.FC<IOptions> = ({ values, label, optionsId, customRef, className }) => {
  const labelId = `${optionsId}-label`
  const listId = `${optionsId}-list`

  // const firstValue = values[0]
  return (
    <div className={className}>
      <Label htmlFor={labelId}>{label}</Label>
      <div className={'horizontal-stack'}>
        <Input list={listId} id={labelId} ref={customRef}/>
        <datalist id={listId}>{values.map(asOption)}</datalist>
      </div>
    </div>
  )
}

const PublicOptions = styled(Options)`
`

export default PublicOptions