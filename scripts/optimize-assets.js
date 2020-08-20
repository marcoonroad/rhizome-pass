#!/usr/bin/env node

const Jimp = require('jimp');

const errorHandler = reason => {
  console.error(reason);
  process.exit(1);
};

Jimp.read('./src/assets/images/stop.png', (reason, image) => {
  if (reason) {
    errorHandler(reason);
  }

  image
    .background(Jimp.cssColorToHex('#d0d0d0'))
    .quality(75)
    .writeAsync('./src/assets/images/stop.jpg')
    .catch(errorHandler);
});
