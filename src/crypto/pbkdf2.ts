import Bytes from './bytes';
import digest from './hash';

const CYCLES = 1000; // 10000000

const getKeyMaterial = async function(password: string) {
  const digestOutput = await digest('SHA-512', password);
  const passwordHash = Bytes.toString(new Uint8Array(digestOutput));

  return window.crypto.subtle.importKey(
    'raw',
    Bytes.fromString(passwordHash),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
};

const computeSalt = async function(salt: string) {
  const image = await digest('SHA-256', salt);
  const text = Bytes.toString(new Uint8Array(image));
  return Bytes.fromString(text.substr(0, 16));
};

async function getDerivedBits(password: string, salt: string) {
  const keyMaterial = await getKeyMaterial(password);
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: await computeSalt(salt),
      iterations: CYCLES,
      hash: 'SHA-512',
    },
    keyMaterial,
    512
  );
  return new Uint8Array(bits);
}

const pbkdf2 = async function(password: string, salt: string) {
  const bytes = await getDerivedBits(password, salt);
  return Bytes.toString(bytes);
};

export default pbkdf2;
