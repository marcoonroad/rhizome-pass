import Storage from './storage';

const KEY = 'hash-tracklist';

// === initialization =====================================
const init = () => {
  const tracklist = Storage.get(KEY);

  if (!tracklist) {
    Storage.set(KEY, {});
  }
};

init();
// ========================================================

/*
const validate = (hashImage : string) => {
  // TODO: implement validation for import
}
*/

const add = (hashImage: string) => {
  init();
  const tracklist = Storage.get(KEY);

  tracklist[hashImage] = true;

  Storage.set(KEY, tracklist);
};

const get = () => {
  init();
  return Storage.get(KEY);
};

const isValidHex = (hashImage: string) => {
  if (!hashImage) return false;
  for (let hashChar of hashImage.toLowerCase().split('')) {
    switch (hashChar) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f': {
        // NOTE: ok continue, it breaks the switch not the for loop
        break;
      }
      default: {
        return false;
      }
    }
  }
  return true;
};

const syncIn = (hashImagesInput: string) => {
  init();
  const hashImages = hashImagesInput
    .replace(/__/g, '')
    .replace(/(\r|\n|\t|\s)/g, ' ')
    .replace(/\s\s+/g, ' ')
    .split(' ');
  const tracklist = Storage.get(KEY);

  for (let index = 0; index < hashImages.length; index += 1) {
    const hashImage = hashImages[index];
    if (
      !!hashImage &&
      hashImage.length >= 64 &&
      hashImage.length <= 128 &&
      isValidHex(hashImage)
    ) {
      tracklist[hashImage] = true;
    }
  }

  Storage.set(KEY, tracklist);
};

const syncOut = () => {
  init();
  const tracklist = Storage.get(KEY);
  const hashImages = Object.keys(tracklist);

  return hashImages.join('\n');
};

const downloadAsFile = () => {
  const fileName = 'rhizome-tracklist.txt';
  const fileData = syncOut();
  const blob = new Blob([fileData], {type: 'plain/text'});
  const navigatorObject: any = window.navigator;
  if (navigatorObject.msSaveOrOpenBlob) {
    navigatorObject.msSaveBlob(blob, fileName);
  } else {
    const elem = window.document.createElement('a');
    elem.id = 'download';
    // const url = "data:text/plain;charset=utf-8," + encodeURIComponent(fileData);
    const url = window.URL.createObjectURL(blob);
    elem.style.display = 'none';
    elem.href = url;
    elem.download = fileName;
    document.body.appendChild(elem);
    elem.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(elem.href);
      elem.href = '';
      document.body.removeChild(elem);
    }, 1);
  }
};

export default {add, get, syncIn, syncOut, downloadAsFile};
