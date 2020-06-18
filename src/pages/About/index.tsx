import React from 'react';
import styled from 'styled-components';
import Install from '../../utils/install';
import share from '../../utils/share';

const {install} = Install;

const DefaultButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
`;

const Button = styled(DefaultButton)`
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`;

const SHARE_TITLE = 'Give a try for this password manager!';
const SHARE_TEXT =
  'Rhizome Pass is a Secure Offline Password Generator/Manager.';
const SHARE_URL = 'https://marcoonroad.dev/rhizome-pass';
// TODO: abstract the whole animation as a separated component

const lines = [
  'Rhizome Pass is an offline password manager / generator',
  'developed by @marcoonroad (Marco Aurélio da Silva). This',
  'password generator uses cryptographic primitives such as',
  "HMAC, hashes, KDF and PRNG. We don't store anything except",
  'for hash images of refreshed generated passwords. This',
  'project is hosted at: ',
];

const fullText = lines.join(' ');

const AboutPage: React.FC = () => {
  const [current, update] = React.useState({
    counter: 0,
    blink: true,
    installable: false,
    installed: false,
  });

  React.useEffect(() => {
    Install.before().then(() => {
      update(state => {
        return {...state, installable: true};
      });
    });

    Install.after().then(() => {
      update(state => {
        return {...state, installed: true};
      });
    });

    if (current.counter === fullText.length) {
      return;

      /*
      const timeout = setTimeout(() => {
        update(current => {
          const blink = !current.blink;
          return {...current, blink};
        });
      }, 400);

      return () => clearTimeout(timeout);
      */
    }

    const timeout = setTimeout(() => {
      update(current => {
        const counter = Math.min(current.counter + 1, fullText.length);
        return {...current, counter};
      });
    }, 70);

    return () => clearTimeout(timeout);
  }, [current.counter, current.blink, current.installed, current.installable]);

  // const suffix = current.blink ? '_' : '';
  const suffix = '_';
  const animatedText = fullText.substr(0, current.counter); // + suffix;
  const difference = fullText.length - current.counter;
  const invisibleText = difference ? fullText.substr(0 - difference) : '~';

  const shareApp = (event: any) => {
    event.preventDefault();

    return share(SHARE_TITLE, SHARE_TEXT, SHARE_URL).catch(console.error);
  };

  return (
    <div className="about-container">
      <p>
        {animatedText}
        <span
          className={
            current.counter === fullText.length
              ? 'about-blink-animation-start'
              : 'about-blink-animation-wait'
          }>
          {suffix}
        </span>
        <span className="about-invisible-text-hack">{invisibleText}</span>
        <br />
        <br />

        <span>
          <i className="material-icons">link</i>{' '}
          <a
            href="https://github.com/marcoonroad/rhizome-pass"
            className="text-link"
            title="Rhizome Pass repository">
            github.com/marcoonroad/rhizome-pass
          </a>
        </span>
        <br />
      </p>

      <Button
        onClick={install}
        className={'form-component'}
        disabled={current.installed || !current.installable}>
        INSTALL <i className="material-icons">get_app</i>
      </Button>

      <Button onClick={shareApp} className={'form-component'}>
        SHARE <i className="material-icons">share</i>
      </Button>
    </div>
  );
};

export default AboutPage;
