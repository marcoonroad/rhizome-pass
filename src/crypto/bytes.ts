const fromString = function(text: string) {
  const chars = [];
  for (let index = 0; index < text.length; index += 1) {
    chars.push(text.charCodeAt(index));
  }
  return new Uint8Array(chars);
};

const toString = function(bytes: ArrayBuffer | Uint8Array | any[]) {
  const bytesArray = new Uint8Array(bytes as any) as any;
  return String.fromCharCode.apply(null, bytesArray);
};

const Bytes = {toString, fromString};

export default Bytes;
