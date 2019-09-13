navigator.storage.persisted().then(async persisted => {
  if (!persisted) {
    await navigator.storage.persist()
  }
})

const PREFIX = 'fountain-pass-'
const storage = localStorage

const set = (key : string, value : any) => {
  if (value === null || value === undefined) {
    storage.removeItem(PREFIX + key)
  } else {
    storage.setItem(PREFIX + key, JSON.stringify(value))
  }
}

const get = (key : string) => {
  const result = storage.getItem(PREFIX + key)

  if (typeof result === 'string') {
    return JSON.parse(result)
  }

  return null
}

export default { get, set }
