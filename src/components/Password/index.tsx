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

const DefaultLabel = styled.label`
  color: white;
  font-family: 'Inconsolata', monospace;
  display: inline-block;
  padding: 0.75em;
`

const Label = DefaultLabel

const Button = styled(DefaultButton)`
  border-radius: 0px 5px 5px 0px;
  margin-left: 0px;
  width: 25%;
`

const Input = styled(DefaultInput)`
  border-radius: 5px 0px 0px 5px;
  margin-right: 0px;
  width: auto;
`

interface IPassword {
  visible : boolean,
  value : string,
  label : string,
  labelId : string,
  customRef : React.RefObject<HTMLInputElement>
}

const Password : React.FC<IPassword> = (initialPassword) => {
  const [currentPassword, setPassword] = React.useState({
    visible: initialPassword.visible,
    value: initialPassword.value
  })
  const passwordInput = initialPassword.customRef

  const grabInputFocus = () => {
    if (passwordInput.current !== null) {
      passwordInput.current.focus()
    }
  }

  const toggleVisibility = (event : any) => {
    event.preventDefault()
    setPassword({ ...currentPassword, visible: !currentPassword.visible })
    grabInputFocus()
  }

  const updatePassword = (event : any) => {
    setPassword({ ...currentPassword, value: event.target.value })
  }

  const id = initialPassword.labelId
  const buttonText = currentPassword.visible ? 'HIDE' : 'SHOW'
  const inputType = currentPassword.visible ? 'text' : 'password'
  const placeholder = currentPassword.visible ? 'password' : '********'

  React.useEffect(() => {
    if (!currentPassword.visible) {
      return
    }

    const timeout = setTimeout(() => {
      console.log('Timeout triggered!')
      setPassword(currentPassword => {
        return { ...currentPassword, visible: false }
      })
    }, 1500)

    return () => clearTimeout(timeout)
  }, [currentPassword.visible])

  return (
    <div>
      <Label htmlFor={id}>{initialPassword.label}</Label><br/>
      <div>
        <Input
          id={id}
          type={inputType}
          value={currentPassword.value}
          ref={passwordInput}
          onMouseEnter={grabInputFocus}
          onChange={updatePassword}
          placeholder={placeholder} />
        <Button
          onClick={toggleVisibility}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default Password