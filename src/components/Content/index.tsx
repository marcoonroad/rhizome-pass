import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Header from '../Header'

import AboutContent from '../../pages/About'
import ManagerComponent from '../../pages/Manager'
import GeneratorContent from '../../pages/Generator'

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
  clickGenerator: () => void,
  clickManager: () => void,
  clickAbout: () => void
}

const HeaderNav : React.FC<IHeaderNav> = function ({
  clickGenerator, clickManager, clickAbout
}) {
  return (
    <NavDiv>
      <Ul>
        <Li className='tab-wrapper'>
          <NavLink to='/generator' className='tab-selector' activeClassName='tab-selector-active'
            title='Generator' onClick={clickGenerator}>Generator</NavLink>
        </Li>
        <Li className='tab-wrapper'>
          <NavLink to='/manager' className='tab-selector' activeClassName='tab-selector-active'
            title='Manager' onClick={clickManager}>Manager</NavLink>
        </Li>
        <Li className='tab-wrapper'>
          <NavLink to='/about' className='tab-selector' activeClassName='tab-selector-active'
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
  // const selfRef = React.useRef<HTMLInputElement>(null)

  // /*
  // */

  /*
  const [current, update] = React.useState({
    timestamp: (new Date()).getTime()
  })
  */

  // const hideFooter = (event : any) => {
  //  if (
  //    (event.target.type === 'text' ||
  //    event.target.type === 'password' ||
  //    (event.target.list !== null &&
  //    event.target.list !== undefined)) // &&
      // selfRef.current !== null
  //  ) {
      // /*
  //    update(() => {
  //      return { visible: false }
  //    })
      // */
      // selfRef.current.style.display = 'none';
  //  }
    // event.target.removeEventListener('focusin')
  // }
  //
  // const showFooter = (event : any) => {
  //  if (
  //    (event.target.type === 'text' ||
  //    event.target.type === 'password' ||
  //    (event.target.list !== null &&
  //    event.target.list !== undefined)) // &&
      // selfRef.current !== null
  //  ) {
      // /*
  //    update(() => {
  //      return { visible: true }
  //    })
      // */
     // selfRef.current.style.display = 'block'
     /*
     update(() => {
       return { timestamp: (new Date()).getTime() }
     }) // forces component reload
     */
  //  }
    // event.target.removeEventListener('focusout')
  // }

  // React.useEffect(() => {
  //  document.addEventListener('focusin', hideFooter)
  //  document.addEventListener('focusout', showFooter)
  //
  //  return () => {
  //    document.removeEventListener('focusin', hideFooter)
  //    document.removeEventListener('focusout', showFooter)
  //  }
  // }, [/*current.timestamp*/current.visible])

  /*
  if (!current.visible) {
    return (
      <div style={{ display: 'none' }}></div>
    )
  }
  */

  return (
    <Footer className={visible ? '' : 'invisible'}>
      <FooterContent>
        <span className={'footer-text'}>@marcoonroad - 2019 copyleft</span>
      </FooterContent>
    </Footer>
  )
}

const Content : React.FC = () => {
  const [current, update] = React.useState({
    visible: false,
  })

  const showFooter = () => {
    update(() => { return { visible: true } })
  }

  const hideFooter = () => {
    update(() => { return { visible: false } })
  }

  return (
    <div id={'content'}>
      <Header title={'Fountain'} subtitle={'Offline Password Manager'}/>

      <Router>
        <div>
          <HeaderNav
            clickGenerator={hideFooter}
            clickManager={showFooter}
            clickAbout={showFooter}/>

          <Switch>
            <Route path="/generator" component={GeneratorContent} />
            <Route path="/manager" component={ManagerComponent} />
            <Route path="/about" component={AboutContent} />
            <Route render={() => <Redirect to='/generator' />} />
          </Switch>
        </div>
      </Router>

      <FooterComponent visible={current.visible}/>
    </div>
  )
}

export default Content