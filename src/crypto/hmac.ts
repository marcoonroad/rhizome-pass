import Bytes from './bytes'

type HashType = 'SHA-256' | 'SHA-512'

const importKey = async function (hashType : HashType, secret : string) {
  const bytes = Bytes.fromString(secret)
  return await window.crypto.subtle.importKey(
    'raw',
    bytes,
    { name: 'HMAC', hash: { name: hashType } },
    false,
    ['sign']
  )
}

const hmac = async function (hashType : HashType, secret : string, message : string) {
  const payload = Bytes.fromString(message)
  const key = await importKey(hashType, secret)
  const signature = await window.crypto.subtle.sign('HMAC', key, payload)
  return Bytes.toString(new Uint8Array(signature))
}

export default hmac