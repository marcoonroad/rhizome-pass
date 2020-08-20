import React from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

import Output from '../../components/Output';

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

const RevealButton = styled(Button)`
  background-color: #282c34;
`;

const CloseButton = styled(Button)`
  background-color: #af4c50;
`;

const Div = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: left;
`;

interface IPasswordOutput {
  password: string;
  outputId: string;
  refreshPassword: (event: any) => void;
}

const PasswordOutput: React.FC<IPasswordOutput> = props => {
  const [state, setState] = React.useState({
    revealPassword: false,
  });

  const togglePassword = () => {
    setState(current => ({
      ...current,
      revealPassword: !current.revealPassword,
    }));
  };

  const toggleText = state.revealPassword ? 'HIDE' : 'SHOW';
  const toggleIcon = state.revealPassword ? 'visibility_off' : 'visibility';

  return (
    <Div>
      <Output
        value={props.password}
        revealPassword={state.revealPassword}
        labelId={props.outputId}
        label={'Output Password'}
        className={'form-component password-output'}
      />
      <br />
      <RevealButton
        onClick={togglePassword}
        type="button"
        disabled={!props.password}
        className={'form-component'}>
        {toggleText} <i className="material-icons">{toggleIcon}</i>
      </RevealButton>
      <br />
      <Button
        onClick={props.refreshPassword}
        type="button"
        disabled={!props.password}
        className={'form-component'}>
        REFRESH <i className="material-icons">refresh</i>
      </Button>
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

export default PasswordOutput;
