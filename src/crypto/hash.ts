import Bytes from './bytes'

type HashType = 'SHA-256' | 'SHA-512'

function digest(hashType : HashType, data : string) {
  return window.crypto.subtle.digest(hashType, Bytes.fromString(data))
}

export default digest