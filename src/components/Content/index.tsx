import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Header from '../Header'

import AboutContent from '../../pages/About'
import ManagerComponent from '../../pages/Manager'
import GeneratorContent from '../../pages/Generator'

import stopIcon from '../../assets/images/stop.png'

const Footer = styled.div`
  flex-grow: 0;
  display: flex;
  background-color: #282c34;
  padding-bottom: 1em;
  padding-top: 1.5em;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const FooterContent = styled.div`
  width: 80%;
  margin: 0 auto;
`

const NavDiv = styled.div`
  width: 80%;
  margin: 0 auto;
`

const Ul = styled.ul`
  display: flex;
  width: 100%;
`

const Li = styled.li`
  width: 50%;
  display: inline-block;
  text-align: center;
`

interface IHeaderNav {
  disabled: boolean,
  clickGenerator: () => void,
  clickManager: () => void,
  clickAbout: () => void
}

const HeaderNav : React.FC<IHeaderNav> = function ({
  disabled, clickGenerator, clickManager, clickAbout
}) {
  const disabledClass = disabled ? 'disabled-link' : ''

  return (
    <NavDiv>
      <Ul>
        <Li className='tab-wrapper'>
          <NavLink to='/generator' className={`tab-selector ${disabledClass}`}
            activeClassName='tab-selector-active'
            title='Generator' onClick={clickGenerator}>Generator</NavLink>
        </Li>
        <Li className='tab-wrapper'>
          <NavLink to='/manager' className={`tab-selector ${disabledClass}`}
            activeClassName='tab-selector-active'
            title='Manager' onClick={clickManager}>Manager</NavLink>
        </Li>
        <Li className='tab-wrapper'>
          <NavLink to='/about' className={`tab-selector ${disabledClass}`}
            activeClassName='tab-selector-active'
            title='About' onClick={clickAbout}>About</NavLink>
        </Li>
      </Ul>
    </NavDiv>
  )
}

interface IFooter {
  visible: boolean
}

const FooterComponent : React.FC<IFooter> = ({ visible }) => {
  return (
    <Footer className={visible ? '' : 'invisible'}>
      <FooterContent>
        <span className={'footer-text'}>@marcoonroad - 2019 copyleft</span>
      </FooterContent>
    </Footer>
  )
}

const StopComponent : React.FC = () => {
  const title = 'STOP NOW!'
  const subtitle = ([
    'Please, turn off your internet connection to use this app.',
    'This is just for security purposes, and \'cause this app',
    'will consume your sensible informations, although in a cryptographic',
    'secure way.'
  ]).join(' ')

  return (
    <div className='stop-component'>
      <img className='stop-icon' src={stopIcon} alt='Stop Now!' title='Stop Now!'/>
      <h3 className='stop-text'>{title}</h3>
      <span className='stop-subtitle'>{subtitle}</span>
    </div>
  )
}

const Content : React.FC = () => {
  const [current, update] = React.useState({
    visible: false,
    online: navigator.onLine,
  })

  const showFooter = () => {
    update(state => { return { ...state, visible: true } })
  }

  const hideFooter = () => {
    update(state => { return { ...state, visible: false } })
  }

  const whenOffline = () => {
    update(state => { return { ...state, online: false } })
  }

  const whenOnline = () => {
    update(state => { return { ...state, online: true } })
  }

  React.useEffect(() => {
    window.addEventListener('offline', whenOffline)
    window.addEventListener('online', whenOnline)
  }, [current.online])

  return (
    <div id={'content'}>
      <Header title={'Fountain Pass'} subtitle={'Offline Password Manager'}/>

      <Router>
        <div>
          <HeaderNav
            disabled={current.online}
            clickGenerator={hideFooter}
            clickManager={showFooter}
            clickAbout={showFooter}/>{
          current.online ? (
            <StopComponent/>
          ) :
          (<Switch>
            <Route path="/generator" component={GeneratorContent} />
            <Route path="/manager" component={ManagerComponent} />
            <Route path="/about" component={AboutContent} />
            <Route render={() => <Redirect to='/generator' />} />
          </Switch>)
        }</div>
      </Router>

      <FooterComponent visible={current.visible && !current.online}/>
    </div>
  )
}

export default Content