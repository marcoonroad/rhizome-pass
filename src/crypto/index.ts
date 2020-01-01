import Bytes from './bytes';
import digest from './hash';
import hmac from './hmac';
import pbkdf2 from './pbkdf2';
import randomBytes from './prng';

const num2hex = function(num: number) {
  return ('00' + num.toString(16)).slice(-2);
};

const asHex = function(payload: string) {
  const array: number[] = [];

  Bytes.fromString(payload).forEach(function(value) {
    array.push(value);
  });

  return [...array].map(num2hex).join('');
};

const asBase64 = function(payload: string) {
  const bytes = Bytes.fromString(payload);
  const array: number[] = [];
  bytes.forEach(function(byte) {
    array.push(byte);
  });
  return btoa(String.fromCharCode.apply(null, array));
};

interface IPasswordOptions {
  length: number | null | undefined;
  digit: boolean | null | undefined;
  upper: boolean | null | undefined;
  lower: boolean | null | undefined;
  special: boolean | null | undefined;
}

const CHARS = {
  DIGIT: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  UPPER: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
  LOWER: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  SPECIAL: [
    '!',
    '@',
    '#',
    '$',
    '%',
    '&',
    '*',
    '(',
    ')',
    '-',
    '_',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '<',
    '>',
    '^',
    '~',
    ':',
    ',',
    '.',
    ';',
    '?',
    '/',
    '|',
  ],
};

const asPassword = function(
  payload: string,
  options: IPasswordOptions = {} as IPasswordOptions
) {
  const length = Math.max(4, Math.min(32, options.length || 12));
  const digit = options.digit === false ? ([] as string[]) : CHARS.DIGIT;
  const upper = options.upper === false ? ([] as string[]) : CHARS.UPPER;
  const lower = options.lower === false ? ([] as string[]) : CHARS.LOWER;
  const special = options.special === false ? ([] as string[]) : CHARS.SPECIAL;

  let set = ([] as string[])
    .concat(digit)
    .concat(lower)
    .concat(upper)
    .concat(special);

  // forces default characters (all) if no set is selected
  if (set.length === 0) {
    set = ([] as string[])
      .concat(CHARS.DIGIT)
      .concat(CHARS.UPPER)
      .concat(CHARS.LOWER)
      .concat(CHARS.SPECIAL);
  }

  const bytes = Bytes.fromString(payload);
  const array: string[] = [];

  bytes.forEach(function(byte, index) {
    if (index < length) {
      array.push(set[byte % set.length]);
    }
  });

  return array.join('');
};

const randomId = function() {
  return asHex(randomBytes(16));
};

const Public = {
  digest,
  hmac,
  pbkdf2,
  randomBytes,
  asHex,
  asBase64,
  asPassword,
  randomId,
};

export default Public;
