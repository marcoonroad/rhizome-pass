import Storage from './storage'

const KEY = 'hash-blacklist'

// === initialization =====================================
const init = () => {
  const blacklist = Storage.get(KEY)

  if (!blacklist) {
    Storage.set(KEY, {})
  }
}

init()
// ========================================================

/*
const validate = (hashImage : string) => {
  // TODO: implement validation for import
}
*/

const add = (hashImage : string) => {
  init()
  const blacklist = Storage.get(KEY)

  blacklist[ hashImage ] = true

  Storage.set(KEY, blacklist)
}

const get = () => {
  init()
  return Storage.get(KEY)
}

const syncIn = (hashImagesInput : string) => {
  init()
  const hashImages = hashImagesInput.replace(/(\r|\n|\t|\s)/g, ' ').replace(/\s\s+/g, ' ').split(' ')
  const blacklist = Storage.get(KEY)

  for (let index = 0; index < hashImages.length; index += 1) {
    const hashImage = hashImages[ index ]
    blacklist[ hashImage ] = true
  }

  Storage.set(KEY, blacklist)
}

const syncOut = () => {
  init()
  const blacklist = Storage.get(KEY)
  const hashImages = Object.keys(blacklist)

  return hashImages.join("\n")
}

export default { add, get, syncIn, syncOut }
