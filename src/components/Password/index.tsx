import React from 'react';
import styled from 'styled-components';

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

const Button = styled(DefaultButton)`
  border-radius: 0px 5px 5px 0px;
  width: 25%;
  display: block;
`;

const Input = styled(DefaultInput)`
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  display: block;
  margin: 0 auto;
`;

const Div = styled.div`
  width: 75%;
  display: block;
`;

interface IPassword {
  visible: boolean;
  value: string;
  label: string;
  labelId: string;
  className: string;
  customRef: React.RefObject<HTMLInputElement>;
}

const Password: React.FC<IPassword> = initialPassword => {
  const [currentPassword, setPassword] = React.useState({
    visible: initialPassword.visible,
    value: initialPassword.value,
  });
  const passwordInput = initialPassword.customRef;

  const grabInputFocus = () => {
    if (passwordInput.current !== null) {
      passwordInput.current.focus();
    }
  };

  const toggleVisibility = (event: any) => {
    event.preventDefault();
    setPassword({...currentPassword, visible: !currentPassword.visible});
    grabInputFocus();
  };

  const updatePassword = (event: any) => {
    setPassword({...currentPassword, value: event.target.value});
  };

  const hideImage = <i className="material-icons">visibility_off</i>;
  const showImage = <i className="material-icons">visibility</i>;

  const id = initialPassword.labelId;
  const buttonText = currentPassword.visible ? hideImage : showImage;
  const inputType = currentPassword.visible ? 'text' : 'password';
  const placeholder = currentPassword.visible ? 'password' : '********';

  React.useEffect(() => {
    if (!currentPassword.visible) {
      return;
    }

    const timeout = setTimeout(() => {
      setPassword(currentPassword => {
        return {...currentPassword, visible: false};
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [currentPassword.visible]);

  const allowEdit = () => {
    if (passwordInput.current) {
      passwordInput.current.readOnly = false;
    }
  };

  const disallowEdit = () => {
    if (passwordInput.current) {
      passwordInput.current.readOnly = true;
    }
  };

  return (
    <div className={initialPassword.className}>
      <Label htmlFor={id}>{initialPassword.label}</Label>
      <div className={'horizontal-stack'}>
        <Div className={'horizontal-stack'}>
          <Input
            id={id}
            type={inputType}
            value={currentPassword.value}
            ref={passwordInput}
            onMouseEnter={undefined}
            onChange={updatePassword}
            placeholder={placeholder}
            autoComplete={'off'}
            readOnly
            onFocus={allowEdit}
            onBlur={disallowEdit}
          />
        </Div>
        <Button onClick={toggleVisibility}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default Password;
