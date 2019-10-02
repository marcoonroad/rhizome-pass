const __window : any = window
const __navigator : any = navigator

const share = async (title : string, text : string, url : string) => {
  if (__window.Windows) {
    const DataTransferManager = __window.Windows.ApplicationModel.DataTransfer.DataTransferManager;

    const dataTransferManager = DataTransferManager.getForCurrentView();
    dataTransferManager.addEventListener('datarequested', (event : any) => {
      const data = event.request.data;

      data.properties.title = title;
      data.properties.url = url;
      data.setText(text);
    });

    DataTransferManager.showShareUI();

    return true;
  } else if (__navigator.share) {
    try {
      await __navigator.share({
        title: title,
        text: text,
        url: url,
      });

      return true;
    } catch (reason) {
      console.error('There was an error trying to share this content: ' + reason);
      return false;
    }
  }
}

export default share

