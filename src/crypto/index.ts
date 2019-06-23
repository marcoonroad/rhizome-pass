import Bytes from './bytes'
import digest from './hash'
import hmac from './hmac'
import pbkdf2 from './pbkdf2'
import randomBytes from './prng'

const num2hex = function (num : number) {
  return ('00' + num.toString(16)).slice(-2);
};

const asHex = function (payload : string) {
  const array : number[] = []

  Bytes.fromString(payload).forEach(function (value) {
    array.push(value)
  })

  return [...array].map(num2hex).join('')
}

const asBase64 = function (payload : string) {
  const bytes = Bytes.fromString(payload)
  const array : number[] = []
  bytes.forEach(function (byte) {
    array.push(byte)
  })
  return btoa(String.fromCharCode.apply(null, array));
}

const randomId = function () {
  return asHex(randomBytes(16))
}

const Public = { digest, hmac, pbkdf2, randomBytes, asHex, asBase64, randomId }

export default Public