import React from 'react';
import styled from 'styled-components';

import Crypto from '../../crypto';
import Blacklist from '../../utils/blacklist';
import Storage from '../../utils/storage';
import Password from '../../components/Password';
import TextInput from '../../components/TextInput';
import Options from '../../components/Options';
import Output from '../../components/Output';

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

const MainPage: React.FC = () => {
  const usernameId = 'master-username-id';
  const passwordId = 'master-password-id';
  const optionsId = 'external-services-id';
  const outputId = 'generated-password-id';

  const [current, update] = React.useState({
    username: '',
    password: '',
    hashImage: '',
    derivedKey: '',
    saltAndData: '',
    nonce: 0,
  });

  const masterPasswordRef = React.useRef<HTMLInputElement>(null);
  const masterUsernameRef = React.useRef<HTMLInputElement>(null);
  const serviceRef = React.useRef<HTMLInputElement>(null);

  const computePass = (hashImage: string) => {
    return Crypto.asPassword(hashImage, {
      length: 12,
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
      nonce,
      derivedKey,
      saltAndData,
    });
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
        <br />
      </div>

      <hr className="content-line-separator" />

      <div>
        <Output
          value={current.password}
          labelId={outputId}
          label={'Output Password'}
          className={'form-component'}
        />
        <br />
        <Button
          onClick={refreshPassword}
          type="button"
          disabled={!current.password}
          className={'form-component'}>
          REFRESH <i className="material-icons">refresh</i>
        </Button>
      </div>
    </Form>
  );
};

export default MainPage;
