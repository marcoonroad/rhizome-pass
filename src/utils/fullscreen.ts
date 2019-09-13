const on = (root = document.querySelector('#root')) => {
  if (document.fullscreenEnabled) {
    if (root) {
      return root.requestFullscreen().catch(reason => {
        console.error(reason.stack)
        throw Error(reason)
      })
    }
  }
}

const off = () => {
  if (document.fullscreenEnabled) {
    document.exitFullscreen()
  }
}

export default { on, off }