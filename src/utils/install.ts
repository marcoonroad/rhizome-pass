let deferredPrompt : any = null;

window.addEventListener('beforeinstallprompt', (event : any) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
});

const install = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log(deferredPrompt)

    deferredPrompt.userChoice.then((choiceResult : any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Your PWA has been installed');
      } else {
        console.log('User chose to not install your PWA');
      }

      deferredPrompt = null;
    });
  }
}

export default install

