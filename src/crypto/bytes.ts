const fromString = function (text : string) {
  const encoder = new TextEncoder()
  const buffer = encoder.encode(text)
  const list : number[] = JSON.parse(`[${buffer.toString()}]`)
  const array = new Uint8Array(list.length)
  list.forEach(function (value, index) {
    array[index] = value
  })
  return array
}

const toString = function (bytes : Uint8Array) {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(bytes)
}

const Bytes = { toString, fromString }

export default Bytes