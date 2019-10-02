const get = () => {
  if ('geolocation' in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
        return position;
      })
    })
  } else {
    return Promise.reject('Geolocation is not supported in this environment!')
  }
}

export default { get }

