import Bytes from './bytes'

const randomBytes = function (bytes : number) {
  const buffer = window.crypto.getRandomValues(new Uint8Array(bytes))
  return Bytes.toString(buffer)
}

export default randomBytes