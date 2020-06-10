import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  NavLink as RealNavLink,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

import Header from '../Header';
import OfflineMode from '../../functors/OfflineMode';

import AboutComponent from '../../pages/About';
import ManagerOfflineComponent from '../../pages/Manager';
import GeneratorOfflineComponent from '../../pages/Generator';

import stopIcon from '../../assets/images/stop.png';

const HistoryComponent: React.FC = () => <div></div>;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #282c34;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3em;
  display: none;
`;

const FooterContent = styled.div`
  width: 80%;
  display: block;
`;

const AbsoluteNavDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  top: auto;
  left: auto;
  right: auto;
  z-index: 500;
`;

const RelativeNavDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  bottom: 0;
  top: auto;
  left: auto;
  right: auto;
  opacity: 0;
  z-index: 5;
`;

const Ul = styled.ul`
  display: flex;
  width: 100%;
`;

const Li = styled.li`
  width: 50%;
  display: inline-block;
  text-align: center;
`;

interface IHeaderNav {
  disabled: boolean;
  clickGenerator: () => void;
  clickManager: () => void;
  clickAbout: () => void;
  mockBottomPadding?: boolean;
}

const HeaderNav: React.FC<IHeaderNav> = function({
  disabled,
  clickGenerator,
  clickManager,
  clickAbout,
  mockBottomPadding,
}) {
  const disabledClass = disabled || mockBottomPadding ? 'disabled-link' : '';

  const NavDiv = mockBottomPadding ? RelativeNavDiv : AbsoluteNavDiv;
  const NavLink = mockBottomPadding ? styled.div`` : RealNavLink;

  return (
    <NavDiv>
      <Ul>
        <Li className="tab-wrapper">
          <NavLink
            to="/generator"
            className={`tab-selector ${disabledClass}`}
            activeClassName="tab-selector-active"
            title="Generator"
            onClick={clickGenerator}>
            <i className="material-icons">lock_outline</i>
            <br />
            Generator
          </NavLink>
        </Li>
        <Li className="tab-wrapper">
          <NavLink
            to="/history"
            className={`tab-selector ${disabledClass}`}
            activeClassName="tab-selector-active"
            title="History"
            onClick={clickGenerator}>
            <i className="material-icons">history</i>
            <br />
            History
          </NavLink>
        </Li>
        <Li className="tab-wrapper">
          <NavLink
            to="/manager"
            className={`tab-selector ${disabledClass}`}
            activeClassName="tab-selector-active"
            title="Manager"
            onClick={clickManager}>
            <i className="material-icons">settings</i>
            <br />
            Manager
          </NavLink>
        </Li>
        <Li className="tab-wrapper">
          <NavLink
            to="/about"
            className={`tab-selector ${disabledClass}`}
            activeClassName="tab-selector-active"
            title="About"
            onClick={clickAbout}>
            <i className="material-icons">info_outline</i>
            <br />
            About
          </NavLink>
        </Li>
      </Ul>
    </NavDiv>
  );
};

interface IFooter {
  online: boolean;
}

const FooterComponent: React.FC<IFooter> = ({online}) => {
  const location = useLocation();

  if (location.pathname === '/generator') {
    return null;
  }

  return (
    <Footer className={!online ? '' : 'invisible'}>
      <FooterContent>
        <span className={'footer-text'}>@marcoonroad - 2019 copyleft</span>
      </FooterContent>
    </Footer>
  );
};

const StopComponent: React.FC = () => {
  const title = 'STOP NOW!';
  const subtitle = [
    'Please, turn off your internet connection to use this app.',
    "This is just for security purposes, and 'cause this app",
    'will consume your sensible informations, although in a cryptographic',
    'secure way.',
  ].join(' ');

  return (
    <div className="stop-component">
      <img
        className="stop-icon"
        src={stopIcon}
        alt="Stop Now!"
        title="Stop Now!"
      />
      <h3 className="stop-text">{title}</h3>
      <span className="stop-subtitle">{subtitle}</span>
    </div>
  );
};

const ManagerComponent: React.FC = () => {
  return (
    <OfflineMode
      onlineComponent={StopComponent}
      offlineComponent={ManagerOfflineComponent}
    />
  );
};

const GeneratorComponent: React.FC = () => {
  return (
    <OfflineMode
      onlineComponent={StopComponent}
      offlineComponent={GeneratorOfflineComponent}
    />
  );
};

const InnerDiv = styled.div`
  padding-bottom: 0.75em;
`;

const Content: React.FC = () => {
  const [current, update] = React.useState({
    visible: false,
    online: navigator.onLine,
  });

  const showFooter = () => {
    update(state => {
      return {...state, visible: true};
    });
  };

  const hideFooter = () => {
    update(state => {
      return {...state, visible: false};
    });
  };

  const whenOffline = () => {
    update(state => {
      return {...state, online: false};
    });
  };

  const whenOnline = () => {
    update(state => {
      return {...state, online: true};
    });
  };

  React.useEffect(() => {
    window.addEventListener('offline', whenOffline);
    window.addEventListener('online', whenOnline);
  }, [current.online]);

  return (
    <div id={'content'}>
      <Router>
        <Header title={'Fountain Pass'} subtitle={'Offline Password Manager'} />

        <InnerDiv>
          <HeaderNav
            disabled={false}
            clickGenerator={hideFooter}
            clickManager={showFooter}
            clickAbout={showFooter}
          />
          <Switch>
            <Route path="/generator" component={GeneratorComponent} />
            <Route path="/manager" component={ManagerComponent} />
            <Route path="/about" component={AboutComponent} />
            <Route path="/history" component={HistoryComponent} />
            <Route render={() => <Redirect to="/generator" />} />
          </Switch>
        </InnerDiv>

        <FooterComponent online={current.online} />

        <HeaderNav
          disabled={true}
          clickGenerator={() => null}
          clickManager={() => null}
          clickAbout={() => null}
          mockBottomPadding={true}
        />
      </Router>
    </div>
  );
};

export default Content;
