import React from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

const DefaultButton = styled.button`
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
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

const Span = styled.span`
  display: inline-block;
  padding-bottom: 0.5em;
`;

interface IAlert {
  message: string;
}

const Alert: React.FC<IAlert> = props => {
  return (
    <Div>
      <Span>{props.message}</Span>
      <br />
      <CloseButton
        onClick={event => {
          event.preventDefault();
          swal.close();
        }}
        type="button"
        className={'form-component'}>
        CLOSE <i className="material-icons">close</i>
      </CloseButton>
    </Div>
  );
};

export default Alert;
