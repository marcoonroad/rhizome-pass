import React from 'react';

interface ITextStatus {
  show: boolean;
  className: string;
  label: string;
}

const TextStatus: React.FC<ITextStatus> = ({show, className, label}) => {
  return (
    <span className={className + (show ? '' : ' invisible')}>
      {label} <i className="material-icons">check_circle</i>
    </span>
  );
};

export default TextStatus;
