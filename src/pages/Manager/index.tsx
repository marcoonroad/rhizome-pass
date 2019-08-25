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

const Button = styled(DefaultButton)`
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`

const aboutImport = ([
  'Here you can sync your refreshed passwords',
  'by copying from an external file and then',
  'clicking the button below to paste the',
  'blacklist hash state inside the application.'
]).join(' ')

const aboutExport = ([
  'To backup your refreshed passwords state',
  'counter through the blacklist hash state,',
  'just click on the button below to copy the',
  'blacklist content and save it on an external',
  'file.'
]).join(' ')

const ManagerComponent : React.FC = () => {
  const importBlacklist = (event : any) => {
    event.preventDefault()
  }

  const exportBlacklist = (event : any) => {
    event.preventDefault()
  }

  return (
    <div className='form-container about-container manager-container'>
      <p>
        <span>{aboutImport}</span><br/><br/>
        <span>Import Blacklist</span>
        <Button onClick={importBlacklist}
          className={'form-component'}>IMPORT</Button>
      </p>

      <p>
        <span>{aboutExport}</span><br/><br/>
        <span>Export Blacklist</span>
        <Button onClick={exportBlacklist}
          className={'form-component'}>EXPORT</Button>
      </p>
    </div>
  )
}

export default ManagerComponent