import React from 'react';
import styled from 'styled-components';
import TextStatus from '../../components/TextStatus';
import Blacklist from '../../utils/blacklist';
import Storage from '../../utils/storage';
import './styles.css';

const DefaultButton = styled.button`
  background-color: #4caf50;
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
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`;

const aboutImport = [
  'Here you can sync your refreshed passwords',
  'by copying from an external file and then',
  'clicking the button below to paste the',
  'blacklist hash state inside the application.',
].join(' ');

const aboutExport = [
  'To backup your refreshed passwords state',
  'counter through the blacklist hash state,',
  'just click on the button below to copy the',
  'blacklist content and save it on an external',
  'file.',
].join(' ');

const {max, min} = Math;

const ManagerComponent: React.FC = () => {
  const [current, update] = React.useState({
    importStatus: false,
    exportStatus: false,
    withDigit: false,
    withUpper: false,
    withSpecial: false,
    passwordLength: 12,
  });

  const passwordLengthRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const withDigit = !Storage.get('settings-no-digit-char');
    const withUpper = !Storage.get('settings-no-upper-char');
    const withSpecial = !Storage.get('settings-no-special-char');

    const passwordLength = Storage.get('settings-password-length') || '12';

    update(current => ({
      ...current,
      withDigit,
      withUpper,
      withSpecial,
      passwordLength: max(4, min(Number.parseInt(passwordLength, 10), 32)),
    }));
  }, []);

  React.useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      update(current => {
        return {...current, importStatus: false, exportStatus: false};
      });
    }, 2000);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [current.importStatus, current.exportStatus]);

  const importBlacklist = async (event: any) => {
    event.preventDefault();

    const addBlacklist = await navigator.clipboard.readText();
    Blacklist.syncIn(addBlacklist);

    update(current => {
      return {...current, importStatus: true, exportStatus: false};
    });
  };

  const exportBlacklist = async (event: any) => {
    event.preventDefault();

    const blacklist = Blacklist.syncOut();
    await navigator.clipboard.writeText(blacklist);

    update(current => {
      return {...current, importStatus: false, exportStatus: true};
    });
  };

  return (
    <div className="form-container about-container manager-container">
      <p>
        <span className="horizontal-flex-stack">
          <span className="manager-action-label">
            Import Blacklist
            <i
              className="material-icons manager-help-icon"
              onClick={() => alert(aboutImport)}>
              help
            </i>
          </span>
          <TextStatus
            label="SUCCESS!"
            className="manager-text-status"
            show={current.importStatus}
          />
        </span>
        <Button
          onClick={importBlacklist}
          className={'form-component'}
          type="button">
          IMPORT <i className="material-icons">arrow_downward</i>
        </Button>
      </p>

      <p>
        <span className="horizontal-flex-stack">
          <span className="manager-action-label">
            Export Blacklist
            <i
              className="material-icons manager-help-icon"
              onClick={() => alert(aboutExport)}>
              help
            </i>
          </span>
          <TextStatus
            label="SUCCESS!"
            className="manager-text-status"
            show={current.exportStatus}
          />
        </span>
        <Button
          onClick={exportBlacklist}
          className={'form-component'}
          type="button">
          EXPORT <i className="material-icons">arrow_upward</i>
        </Button>
      </p>

      <hr className="content-line-separator" />

      <p>
        <h2 className="password-options-title">Output Password Options</h2>
      </p>

      <p>
        <span
          className="checkbox-container"
          onClick={() => {
            update(current => {
              Storage.set('settings-no-digit-char', current.withDigit);
              return {
                ...current,
                withDigit: !current.withDigit,
              };
            });
          }}>
          <i className="material-icons">
            {current.withDigit ? 'check_box' : 'check_box_outline_blank'}
          </i>{' '}
          <span>With Digits</span>
        </span>
      </p>

      <p>
        <span
          className="checkbox-container"
          onClick={() => {
            update(current => {
              Storage.set('settings-no-upper-char', current.withUpper);
              return {
                ...current,
                withUpper: !current.withUpper,
              };
            });
          }}>
          <i className="material-icons">
            {current.withUpper ? 'check_box' : 'check_box_outline_blank'}
          </i>{' '}
          <span>With Uppercase Letters</span>
        </span>
      </p>

      <p>
        <span
          className="checkbox-container"
          onClick={() => {
            update(current => {
              Storage.set('settings-no-special-char', current.withSpecial);
              return {
                ...current,
                withSpecial: !current.withSpecial,
              };
            });
          }}>
          <i className="material-icons">
            {current.withSpecial ? 'check_box' : 'check_box_outline_blank'}
          </i>{' '}
          <span>With Special Chars</span>
        </span>
      </p>

      <p>
        <span className="password-length-range-title">
          Password Length: {current.passwordLength.toString()}
        </span>
        <br />
        <span className="password-length-range-line">
          <span className="password-length-range-start">04</span>
          <input
            type="range"
            ref={passwordLengthRef}
            className="password-length-range-input"
            onChange={() => {
              const value = passwordLengthRef.current
                ? passwordLengthRef.current.value
                : current.passwordLength.toString();
              const passwordLength = Number.parseInt(value, 10);

              update(current => {
                Storage.set(
                  'settings-password-length',
                  passwordLength.toString()
                );
                return {
                  ...current,
                  passwordLength,
                };
              });
            }}
            value={current.passwordLength.toString()}
            min={4}
            max={32}
            step="1"
          />
          <span className="password-length-range-end">32</span>
        </span>
      </p>
    </div>
  );
};

export default ManagerComponent;
