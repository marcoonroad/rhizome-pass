import React from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import TextStatus from '../../components/TextStatus';
import './styles.css';

const DefaultButton = styled.button`
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
  background-color: #4caf50;
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`;

const CloseButton = styled(Button)`
  background-color: #af4c50;
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: left;
`;

const DivList = styled.div`
  max-height: 60vw;
  overflow-y: scroll;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 5px;
`;

const LeftSpan = styled.span`
  text-align: left;
  display: inline-block;
  width: 80%;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const RightSpan = styled.span`
  text-align: right;
  display: inline-block;
  width: 20%;
`;

const LabelSpan = styled.span`
  padding: 0.75em;
  display: inline-block;
`;

const RevealButton = styled(Button)`
  background-color: #282c34;
`;

const ItemButton = styled.button.attrs({
  type: 'button',
})`
  display: block;
  width: 100%;
  border-width: 0;
  outline: none;
  border-radius: 0;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0);
  background: transparent;
`;

interface IPasswordHistory {
  passwords: string[];
}

const PasswordHistory: React.FC<IPasswordHistory> = props => {
  const [state, setState] = React.useState({
    copyStatus: false,
    selectedItem: '',
    revealPasswords: false,
  });

  React.useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setState(current => ({
        ...current,
        copyStatus: false,
      }));
    }, 2000);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [state.copyStatus]);

  const copyContent = (event: any, value: string) => {
    event.preventDefault();

    navigator.clipboard.writeText(value);
    setState(current => ({
      ...current,
      copyStatus: true,
      selectedItem: value,
    }));
  };

  const togglePasswords = () => {
    setState(current => ({
      ...current,
      revealPasswords: !current.revealPasswords,
    }));
  };

  const toggleText = state.revealPasswords ? 'HIDE ALL' : 'SHOW ALL';
  const toggleIcon = state.revealPasswords ? 'visibility_off' : 'visibility';

  return (
    <Div>
      <span>
        <LabelSpan>Password History</LabelSpan>
        <TextStatus
          label="COPIED!"
          className="manager-text-status"
          show={state.copyStatus}
        />
      </span>

      <DivList>
        <ul className="password-history-list">
          {props.passwords.map((password, index) => (
            <li key={password} className="password-history-entry">
              <ItemButton
                onClick={event => copyContent(event, password)}
                className={`password-history-button ${
                  state.selectedItem === password
                    ? 'selected-password-history-button'
                    : ''
                }`}>
                <LeftSpan>
                  {state.revealPasswords
                    ? password
                    : '*'.repeat(password.length)}
                </LeftSpan>
                <RightSpan>#{props.passwords.length - index}</RightSpan>
              </ItemButton>
            </li>
          ))}
        </ul>
      </DivList>
      <br />
      <RevealButton
        onClick={togglePasswords}
        type="button"
        disabled={false}
        className={'form-component'}>
        {toggleText} <i className="material-icons">{toggleIcon}</i>
      </RevealButton>
      <br />
      <CloseButton
        onClick={() => swal.close()}
        type="button"
        className={'form-component'}>
        CLOSE <i className="material-icons">close</i>
      </CloseButton>
    </Div>
  );
};

export default PasswordHistory;
