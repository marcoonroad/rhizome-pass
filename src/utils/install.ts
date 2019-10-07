import promise from './promise'

const beforeInstall = promise.defer<any>()
const afterInstall = promise.defer<any>()

let deferredPrompt : any = null;

const install = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log(deferredPrompt)

    deferredPrompt.userChoice.then((choiceResult : any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Your PWA has been installed!')
      } else {
        console.log('User chose to not install your PWA...')
      }

      deferredPrompt = null;
    });
  } else {
    console.warn('Could not catch before install prompt event!')
  }
}

window.addEventListener('beforeinstallprompt', (event : any) => {
  event.preventDefault()
  deferredPrompt = event

  beforeInstall.resolve(event)
})

window.addEventListener('appinstalled', () => {
  afterInstall.resolve(true)
})

afterInstall.promise.then(() => {
  localStorage.setItem('appinstalled', 'true')
})

const after = () => afterInstall.promise
const before = () => beforeInstall.promise

export default { install, after, before }
