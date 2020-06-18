import React from 'react';
import styled from 'styled-components';

const DefaultInput = styled.input`
  background-color: white;
  border: none;
  color: #4caf50;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
`;

const DefaultLabel = styled.label`
  color: black;
  font-family: 'Inconsolata', monospace;
  display: inline-block;
  padding: 0.75em;

  display: block !important;
`;

const Label = DefaultLabel;

const Input = styled(DefaultInput)`
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  display: block;
`;

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
  border-radius: 0px 5px 5px 0px;
  width: 25%;
  display: block;
`;

const Div = styled.div`
  width: 75%;
  display: block;
`;

const exists = (value: any) => {
  return value !== null && value !== undefined && value !== '' && value !== 0;
};

interface ITextInput {
  value: string;
  placeholder: string;
  label: string;
  labelId: string;
  className: string;
  customRef: React.RefObject<HTMLInputElement>;
}

const TextInput: React.FC<ITextInput> = props => {
  const [state, setState] = React.useState({
    value: props.value,
    clean: false,
  });

  /*
  const grabInputFocus = () => {
    if (props.customRef.current !== null) {
      props.customRef.current.focus();
    }
  };
  */
  const clearSelection = (event: any) => {
    event.preventDefault();

    if (props.customRef.current && exists(props.customRef.current.value)) {
      props.customRef.current.value = '';
      setState({clean: true, value: ''});
    }
  };

  const updateText = () => {
    if (props.customRef.current && exists(props.customRef.current.value)) {
      const value = props.customRef.current.value;
      setState({...state, value});
    }
  };

  const noValue = () => {
    return !state.value;
  };

  const allowEdit = () => {
    if (props.customRef.current) {
      props.customRef.current.readOnly = false;
    }
  };

  const disallowEdit = () => {
    if (props.customRef.current) {
      props.customRef.current.readOnly = true;
    }
  };

  return (
    <div className={props.className}>
      <Label htmlFor={props.labelId}>{props.label}</Label>
      <div className="horizontal-stack">
        <Div className="horizontal-stack">
          <Input
            id={props.labelId}
            type="text"
            placeholder={props.placeholder}
            onChange={updateText}
            ref={props.customRef}
            autoComplete={'off'}
            readOnly
            onFocus={allowEdit}
            onBlur={disallowEdit}
            value={state.value}
            autoCorrect="off"
            autoCapitalize="none"
          />
        </Div>
        <Button type="button" disabled={noValue()} onClick={clearSelection}>
          <i className="material-icons">clear</i>
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
