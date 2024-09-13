import ThreeBridgeRepository, {DefaultThreeBridgeRepository} from './repository/ThreeBridgeRepository.ts'
import {useEffect, useState} from 'react'

type Props = {
  threeBridgeRepository?: ThreeBridgeRepository
}

export default function HogeScreen({threeBridgeRepository = new DefaultThreeBridgeRepository()}: Props) {
  const [threeBridge, setThreeBridge] = useState<string[]>([])

  useEffect(() => {
    threeBridgeRepository?.getThreeBridge()
      .then(res => setThreeBridge(res))
  }, [])

  return (
    <>
      {threeBridge.map(text => (
        <div key={window.crypto.randomUUID()}>{text}</div>
      ))}
    </>
  )
}


