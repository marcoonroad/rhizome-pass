import React from 'react';
import styled from 'styled-components';

const DefaultLabel = styled.label`
  color: black;
  font-family: 'Inconsolata', monospace;
  display: inline-block;
  padding: 0.75em;

  display: block !important;
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
  border-radius: 5px 0px 0px 5px;
`;

const Label = DefaultLabel;

const Input = styled(DefaultInput)`
  margin: 0 auto;
  display: block;
  width: 100%;
`;

interface IOptions {
  label: string;
  values: Array<string>;
  optionsId: string;
  className: string;
  customRef: React.RefObject<HTMLInputElement>;
}

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

const asKey = (value: string) => value.toLowerCase().replace(/\s/g, '-');
const asOption = (value: string) => (
  <option value={value} key={asKey(value)}>
    {value}
  </option>
);

const exists = (value: any) => {
  return value !== null && value !== undefined && value !== '' && value !== 0;
};

const Options: React.FC<IOptions> = ({
  values,
  label,
  optionsId,
  customRef,
  className,
}) => {
  const labelId = `${optionsId}-label`;
  const listId = `${optionsId}-list`;

  const [current, update] = React.useState({clean: false, value: ''});

  const clearSelection = (event: any) => {
    event.preventDefault();

    if (customRef.current && exists(customRef.current.value)) {
      customRef.current.value = '';
      update({clean: true, value: ''});
    }
  };

  const trackChanges = () => {
    if (customRef.current && exists(customRef.current.value)) {
      const value = customRef.current.value;
      update({...current, value});
    }
  };

  const noValue = () => {
    return !current.value;
  };

  return (
    <div className={className}>
      <Label htmlFor={labelId}>{label}</Label>
      <div className={'horizontal-stack'}>
        <Div className="horizontal-stack">
          <Input
            list={listId}
            id={labelId}
            ref={customRef}
            onChange={trackChanges}
            value={current.value}
          />
          <datalist id={listId}>{values.map(asOption)}</datalist>
        </Div>
        <Button type="button" disabled={noValue()} onClick={clearSelection}>
          <i className="material-icons">clear</i>
        </Button>
      </div>
    </div>
  );
};

const PublicOptions = styled(Options)``;

export default PublicOptions;
