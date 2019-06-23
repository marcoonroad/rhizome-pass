import React from 'react'
import styled from 'styled-components'

import Crypto from '../../crypto'
import Password from '../Password'
import Options from '../Options'
import Output from '../Output'
import Header from '../Header'

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

const Button = styled(DefaultButton)`
  width: 100%;
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`

const servicesList = [
  'Twitter', 'Facebook', 'GitHub', 'GitLab', 'Bitbucket', 'GMail'
]

const Form = styled.form`
  padding-top: 25px;
  width: 90%;
  margin: 0 auto;
  display: block;
  margin-bottom: 50px;
`

const Div = styled.div`
`

const Content : React.FC = () => {
  const passwordId = 'master-password-id'
  const optionsId = 'external-services-id'

  const [current, update] = React.useState({
    password: 'Teste talkey?'
  })

  const masterPasswordRef = React.useRef<HTMLInputElement>(null)
  const serviceRef = React.useRef<HTMLInputElement>(null)

  const generatePassword = async function (event : any) {
    event.preventDefault()

    const data = masterPasswordRef.current !== null ? masterPasswordRef.current.value : ''
    const salt = serviceRef.current !== null ? serviceRef.current.value : ''

    if (data === '' || salt === '') {
      alert('You must fill both the master password and service fields!')
      return
    }

    const newPassword = Crypto.asBase64(await Crypto.pbkdf2(data, salt))
      .replace(/\//g, '')
      .substr(0, 12)

    update({ ...current, password: newPassword })
  }

  const refreshPassword = function () {

  }

  return (
    <Div id={'content'}>
      <Header title={'Fountain'} subtitle={'Offline Password Manager'}/>
      <Form>
        <Password customRef={masterPasswordRef}
          labelId={passwordId} visible={false} value={''} label={'Master Password'}/><br/>
        <Options customRef={serviceRef}
          optionsId={optionsId} values={servicesList} label={'External Service'}/><br/>
        <Button onClick={generatePassword}>GENERATE</Button><br/><br/>
        <Output value={current.password} /><br/>
        <Button onClick={refreshPassword}>REFRESH</Button>
      </Form>
    </Div>
  )
}

export default Content