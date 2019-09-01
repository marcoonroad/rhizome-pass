import Storage from './storage'

// === initialization =====================================
const KEY = 'hash-blacklist'
const blacklist = Storage.get(KEY)

if (!blacklist) {
  Storage.set(KEY, {})
}
// ========================================================

/*
const validate = (hashImage : string) => {

}
*/

const add = (hashImage : string) => {
  const blacklist = Storage.get(KEY)

  blacklist[ hashImage ] = true

  Storage.set(KEY, blacklist)
}

const get = () => Storage.get(KEY)

const syncIn = (hashImages : string[]) => {
  const blacklist = Storage.get(KEY)

  for (let index = 0; index < hashImages.length; index += 1) {
    const hashImage = hashImages[ index ]
    blacklist[ hashImage ] = true
  }

  Storage.set(KEY, blacklist)
}

const syncOut = () => {
  const blacklist = Storage.get(KEY)
  const hashImages = Object.keys(blacklist)

  return hashImages.join("\n")
}

export default { add, get, syncIn, syncOut }
