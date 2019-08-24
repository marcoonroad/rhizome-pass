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
        <span>Import Blacklist</span>
        <Button onClick={importBlacklist}
          className={'form-component'}>IMPORT</Button>
      </p>

      <p>
        <span>Export Blacklist</span>
        <Button onClick={exportBlacklist}
          className={'form-component'}>EXPORT</Button>
      </p>
    </div>
  )
}

export default ManagerComponent