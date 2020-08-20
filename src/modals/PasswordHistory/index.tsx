import React from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
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

interface IPasswordHistory {
  passwords: string[];
}

const PasswordHistory: React.FC<IPasswordHistory> = props => {
  return (
    <Div>
      <LabelSpan>Password History</LabelSpan>
      <DivList>
        <ul className="password-history-list">
          {props.passwords.map((password, index) => (
            <li key={password} className="password-history-entry">
              <LeftSpan>{password}</LeftSpan>
              <RightSpan>#{props.passwords.length - index}</RightSpan>
            </li>
          ))}
        </ul>
      </DivList>
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
