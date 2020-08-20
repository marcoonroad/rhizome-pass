import React from 'react';
import styled from 'styled-components';

const TextSpan = styled.span`
  transition: 0.5s;
`;

interface ITextStatus {
  show: boolean;
  className: string;
  label: string;
}

const TextStatus: React.FC<ITextStatus> = ({show, className, label}) => {
  return (
    <TextSpan className={className + (show ? '' : ' invisible')}>
      {label} <i className="material-icons">check_circle</i>
    </TextSpan>
  );
};

export default TextStatus;
