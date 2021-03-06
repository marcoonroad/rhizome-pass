import React from 'react'

interface IOfflineMode {
  onlineComponent : React.FC,
  offlineComponent : React.FC
}

const OfflineMode : React.FC<IOfflineMode> = ({ onlineComponent, offlineComponent }) => {
  const [current, update] = React.useState({
    online: navigator.onLine
  })

  const whenOffline = () => update({ online: false })
  const whenOnline = () => update({ online: true })

  React.useEffect(() => {
    window.addEventListener('offline', whenOffline)
    window.addEventListener('online', whenOnline)

    return () => {
      window.removeEventListener('offline', whenOffline)
      window.removeEventListener('online', whenOnline)
    }
  }, [current.online])

  const Online = onlineComponent
  const Offline = offlineComponent

  if (current.online) {
    return (<Online />)
  } else {
    return (<Offline />)
  }
}

export default OfflineMode
