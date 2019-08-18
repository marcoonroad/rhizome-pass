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
  className : string
}

const Output : React.SFC<IOutput> = ({ value, className }) => {
  const passwordOutput = React.useRef<HTMLInputElement>(null);

  const copyContent = (event : any) => {
    event.preventDefault()
    const selection = document.getSelection()

    if (selection !== null) {
      const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false

      if (passwordOutput.current !== null) {
        passwordOutput.current.select()

        document.execCommand('copy') // may fail/throw

        selection.removeAllRanges();
        if (selected !== false) {
          selection.addRange(selected);
        }
      }
    }
  }

  return (
    <div className={`${className} horizontal-stack`}>
      <StyledOutput
        ref={passwordOutput}
        readOnly
        value={value} />
      <Button
        onClick={copyContent}>COPY</Button>
    </div>
  )
}

const PublicOutput = styled(Output)`
`

export default React.memo(PublicOutput)