import React from 'react';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';

import Crypto from '../../crypto';
import Blacklist from '../../utils/blacklist';
import Storage from '../../utils/storage';
import Password from '../../components/Password';
import TextInput from '../../components/TextInput';
import Options from '../../components/Options';
import PasswordOutputModal from '../../modals/PasswordOutput';
import PasswordHistoryModal from '../../modals/PasswordHistory';

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

const HistoryButton = styled(Button)`
  background-color: #282c34;
`;

const servicesList = [
  'Twitter',
  'Facebook',
  'GitHub',
  'GitLab',
  'Bitbucket',
  'GMail',
];

const Form = styled.form`
  padding-top: 25px;
  margin: 0 auto;
  display: block;

  width: 80%;
`;

const {max, min} = Math;

const MainPage: React.FC = () => {
  const usernameId = 'master-username-id';
  const passwordId = 'master-password-id';
  const optionsId = 'external-services-id';
  const outputId = 'generated-password-id';

  const [current, update] = React.useState({
    username: '',
    password: '',
    oldPasswords: [] as string[],
    hashImage: '',
    derivedKey: '',
    saltAndData: '',
    nonce: 0,
  });

  const masterPasswordRef = React.useRef<HTMLInputElement>(null);
  const masterUsernameRef = React.useRef<HTMLInputElement>(null);
  const serviceRef = React.useRef<HTMLInputElement>(null);

  const computePass = (hashImage: string) => {
    const passwordLength = Number.parseInt(
      Storage.get('settings-password-length') || '12',
      10
    );
    const length = max(4, min(passwordLength, 32));

    return Crypto.asPassword(hashImage, {
      length,
      digit: !Storage.get('settings-no-digit-char'),
      upper: !Storage.get('settings-no-upper-char'),
      lower: true,
      special: !Storage.get('settings-no-special-char'),
    });
  };

  const computePairs = async (data: string, salt: string, initialNonce = 0) => {
    const derivedKey = await Crypto.pbkdf2(data, salt);
    const blacklist = Blacklist.get();

    let nonce = initialNonce;
    console.log('Trying the HMAC nonce: ' + nonce);
    let hashImage = await Crypto.hmac('SHA-512', nonce.toString(), derivedKey);
    let hexHashImage = Crypto.asHex(hashImage);

    while (blacklist[hexHashImage]) {
      nonce += 1;
      console.log('Trying the HMAC nonce: ' + nonce);
      hashImage = await Crypto.hmac('SHA-512', nonce.toString(), derivedKey);
      hexHashImage = Crypto.asHex(hashImage);
    }

    const newPassword = computePass(hashImage);

    return {hashImage, newPassword, nonce, derivedKey};
  };

  const computeHistory = async (data: string, salt: string) => {
    const initialNonce = 0;
    const derivedKey = await Crypto.pbkdf2(data, salt);
    const blacklist = Blacklist.get();

    let nonce = initialNonce;
    console.log('Trying the HMAC nonce: ' + nonce);
    let hashImage = await Crypto.hmac('SHA-512', nonce.toString(), derivedKey);
    let hexHashImage = Crypto.asHex(hashImage);
    const oldPasswords: string[] = [];

    while (blacklist[hexHashImage]) {
      oldPasswords.unshift(computePass(hashImage));
      nonce += 1;
      console.log('Trying the HMAC nonce: ' + nonce);
      hashImage = await Crypto.hmac('SHA-512', nonce.toString(), derivedKey);
      hexHashImage = Crypto.asHex(hashImage);
    }

    console.log(oldPasswords);

    return {hashImage, oldPasswords, nonce, derivedKey};
  };

  const refreshPassword = async function(event: any) {
    event.preventDefault();

    if (current.hashImage && current.derivedKey) {
      const nonce = current.nonce + 1;
      const hexHashImage = Crypto.asHex(current.hashImage);
      console.log('Refreshing the new HMAC nonce: ' + nonce);
      const hashImage = await Crypto.hmac(
        'SHA-512',
        nonce.toString(),
        current.derivedKey
      );
      const newPassword = computePass(hashImage);

      Blacklist.add(hexHashImage);

      update({...current, hashImage, password: newPassword, nonce});
    }
  };

  const generatePassword = async function(event: any) {
    event.preventDefault();

    const user =
      masterUsernameRef.current !== null ? masterUsernameRef.current.value : '';
    const pass =
      masterPasswordRef.current !== null ? masterPasswordRef.current.value : '';
    const service = serviceRef.current !== null ? serviceRef.current.value : '';

    if (user === '' || pass === '' || service === '') {
      alert('You must fill the username, master password and service fields!');
      return;
    }

    const salt = service;
    const data = user + '\n' + pass;

    // no changes from form inputs since last operation?
    const saltAndData = [service, user, pass].join('\n');
    const initialNonce =
      current.saltAndData === saltAndData ? current.nonce : undefined;

    const {newPassword, hashImage, nonce, derivedKey} = await computePairs(
      data,
      salt,
      initialNonce
    );

    update({
      ...current,
      hashImage,
      password: newPassword,
      oldPasswords: [],
      nonce,
      derivedKey,
      saltAndData,
    });
  };

  const showHistory = async function(event: any) {
    event.preventDefault();

    const user =
      masterUsernameRef.current !== null ? masterUsernameRef.current.value : '';
    const pass =
      masterPasswordRef.current !== null ? masterPasswordRef.current.value : '';
    const service = serviceRef.current !== null ? serviceRef.current.value : '';

    if (user === '' || pass === '' || service === '') {
      alert('You must fill the username, master password and service fields!');
      return;
    }

    const salt = service;
    const data = user + '\n' + pass;

    // no changes from form inputs since last operation?
    const saltAndData = [service, user, pass].join('\n');
    //const initialNonce =
    //  current.saltAndData === saltAndData ? current.nonce : undefined;

    const {oldPasswords, hashImage, nonce, derivedKey} = await computeHistory(
      data,
      salt
    );
    if (oldPasswords && oldPasswords.length > 0) {
      update({
        ...current,
        hashImage,
        password: '',
        oldPasswords: oldPasswords,
        nonce,
        derivedKey,
        saltAndData,
      });
    } else {
      alert(
        'No password output history found for typed username, master password and service!'
      );
    }
  };

  React.useEffect(() => {
    if (current.password) {
      swal({
        content: (
          <PasswordOutputModal
            password={current.password}
            refreshPassword={refreshPassword}
            outputId={outputId}
          />
        ),
        buttons: false,
      });
    } else if (current.oldPasswords && current.oldPasswords.length > 0) {
      swal({
        content: <PasswordHistoryModal passwords={current.oldPasswords} />,
        buttons: false,
      });
    }
    return () => {
      if (
        current.password ||
        (current.oldPasswords && current.oldPasswords.length > 0)
      ) {
        swal.close();
      }
    };
  });

  return (
    <Form className={'form-container'}>
      <div>
        <TextInput
          customRef={masterUsernameRef}
          labelId={usernameId}
          value={''}
          label={'Master Username'}
          className={'form-component'}
          placeholder={'username'}
        />
        <br />
        <Password
          customRef={masterPasswordRef}
          labelId={passwordId}
          visible={false}
          value={''}
          label={'Master Password'}
          className={'form-component'}
        />
        <br />
        <Options
          customRef={serviceRef}
          optionsId={optionsId}
          values={servicesList}
          label={'External Service'}
          className={'form-component'}
        />
        <br />
        <Button
          onClick={generatePassword}
          type="button"
          className={'form-component'}>
          GENERATE <i className="material-icons">vpn_key</i>
        </Button>
        <br />
        <HistoryButton
          onClick={showHistory}
          type="button"
          className={'form-component'}>
          HISTORY <i className="material-icons">history</i>
        </HistoryButton>
        <br />
        <br />
      </div>
    </Form>
  );
};

export default MainPage;
