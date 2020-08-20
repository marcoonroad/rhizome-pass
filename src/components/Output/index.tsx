import React from 'react';
import styled from 'styled-components';

import TextStatus from '../../components/TextStatus';

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

const Span = styled.span`
  color: black;
  font-family: 'Inconsolata', monospace;
  display: flex !important;
  padding: 0.75em;
  text-align: left;
  flex-direction: row;
`;

const Label = styled.label`
  display: block !important;
  padding-left: 0em;
  padding-right: 0.75em;
  margin-left: 0;
  margin-right: auto;
`;

const Button = styled(DefaultButton)`
  border-radius: 0px 5px 5px 0px;
  width: 25%;
  display: block;
`;

const StyledOutput = styled.div`
  background-color: white;
  border: none;
  color: #4caf50;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 5px 0px 0px 5px;
  border-color: #4caf50;
  border-style: solid;
  border-width: 2px;
  width: 75%;
  display: block;
`;

interface IOutput {
  value: string;
  className: string;
  label: string;
  labelId: string;
  revealPassword: boolean;
}

const Output: React.FC<IOutput> = ({
  value,
  className,
  label,
  labelId,
  revealPassword,
}) => {
  const [state, setState] = React.useState({
    copyStatus: false,
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

  const copyContent = (event: any) => {
    event.preventDefault();

    navigator.clipboard.writeText(value);
    setState(current => ({
      ...current,
      copyStatus: true,
    }));
  };

  const disabled = !value;
  const output = revealPassword ? value : '*'.repeat(value.length);

  return (
    <div className={`${className}`}>
      <Span className="horizontal-flex-stack">
        <Label htmlFor={labelId}>{label}</Label>
        <TextStatus
          label="COPIED!"
          className="manager-text-status"
          show={state.copyStatus}
        />
      </Span>
      <div className={'horizontal-stack'}>
        <StyledOutput>
          <div className="autoscroll-animated-text">{output}</div>
        </StyledOutput>
        <Button type="button" disabled={disabled} onClick={copyContent}>
          <i className="material-icons">file_copy</i>
        </Button>
      </div>
    </div>
  );
};

export default Output;
