import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Header from '../Header'

import AboutContent from '../../pages/About'
import FormContent from '../../pages/Main'

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

const HeaderNav : React.FC = function () {
  return (
    <NavDiv>
      <Ul>
        <Li className='tab-wrapper'>
          <NavLink to='/main' className='tab-selector' activeClassName='tab-selector-active'
            title='Home'>Home</NavLink>
        </Li>
        <Li className='tab-wrapper'>
          <NavLink to='/about' className='tab-selector' activeClassName='tab-selector-active'
            title='About'>About</NavLink>
        </Li>
      </Ul>
    </NavDiv>
  )
}

const FooterComponent : React.FC = () => {
  // const selfRef = React.useRef<HTMLInputElement>(null)

  // /*
  const [current, update] = React.useState({
    visible: true,
  })
  // */

  /*
  const [current, update] = React.useState({
    timestamp: (new Date()).getTime()
  })
  */

  const hideFooter = (event : any) => {
    if (
      (event.target.type === 'text' ||
      event.target.type === 'password' ||
      (event.target.list !== null &&
      event.target.list !== undefined)) // &&
      // selfRef.current !== null
    ) {
      // /*
      update(() => {
        return { visible: false }
      })
      // */
      // selfRef.current.style.display = 'none';
    }
    // event.target.removeEventListener('focusin')
  }

  const showFooter = (event : any) => {
    if (
      (event.target.type === 'text' ||
      event.target.type === 'password' ||
      (event.target.list !== null &&
      event.target.list !== undefined)) // &&
      // selfRef.current !== null
    ) {
      // /*
      update(() => {
        return { visible: true }
      })
      // */
     // selfRef.current.style.display = 'block'
     /*
     update(() => {
       return { timestamp: (new Date()).getTime() }
     }) // forces component reload
     */
    }
    // event.target.removeEventListener('focusout')
  }

  React.useEffect(() => {
    document.addEventListener('focusin', hideFooter)
    document.addEventListener('focusout', showFooter)

    return () => {
      document.removeEventListener('focusin', hideFooter)
      document.removeEventListener('focusout', showFooter)
    }
  }, [/*current.timestamp*/current.visible])

  /*
  if (!current.visible) {
    return (
      <div style={{ display: 'none' }}></div>
    )
  }
  */

  return (
    <Footer className={current.visible ? '' : 'invisible'}>
      <FooterContent>
        <span className={'footer-text'}>@marcoonroad - 2019 copyleft</span>
      </FooterContent>
    </Footer>
  )
}

const Content : React.FC = () => {
  return (
    <div id={'content'}>
      <Header title={'Fountain'} subtitle={'Offline Password Manager'}/>

      <Router>
        <div>
          <HeaderNav/>

          <Switch>
            <Route path="/main" component={FormContent} />
            <Route path="/about" component={AboutContent} />
            <Route render={() => <Redirect to='/main' />} />
          </Switch>
        </div>
      </Router>

      <FooterComponent/>
    </div>
  )
}

export default Content