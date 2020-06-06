import React from 'react';
import styled from 'styled-components';
import TextStatus from '../../components/TextStatus';
import Blacklist from '../../utils/blacklist';

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

const ManagerComponent: React.FC = () => {
  const [current, update] = React.useState({
    importStatus: false,
    exportStatus: false,
  });

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
        <Button onClick={importBlacklist} className={'form-component'}>
          IMPORT <i className="material-icons">arrow_downward</i>
        </Button>
      </p>

      <hr className="content-line-separator" />

      <p className="no-bottom-padding-hack">
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
        <Button onClick={exportBlacklist} className={'form-component'}>
          EXPORT <i className="material-icons">arrow_upward</i>
        </Button>
      </p>
    </div>
  );
};

export default ManagerComponent;
