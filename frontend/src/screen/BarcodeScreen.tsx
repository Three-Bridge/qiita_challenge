import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {BrowserMultiFormatReader, IScannerControls} from '@zxing/browser'
import {useNavigate} from 'react-router-dom'
import {Authenticator} from '@aws-amplify/ui-react'

type Props = {
  setBarcodeData: Dispatch<SetStateAction<string | null>>
}

export default function BarcodeScreen({setBarcodeData}: Props) {
  const streamRef = useRef<MediaStream | null>(null)
  const unsubscribeRef = useRef<IScannerControls | null>(null)
  const navigate = useNavigate()
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    if (videoElement) {
      startScanner(codeReader)
    }
  }, [videoElement])

  async function startScanner(codeReader: BrowserMultiFormatReader) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
      videoElement!.srcObject = stream
      streamRef.current = stream

      unsubscribeRef.current = await handleBarcodeScan(codeReader, videoElement!)
    } catch (err) {
      console.error('Error accessing the camera: ', err)
    }
  }

  async function handleBarcodeScan(
    codeReader: BrowserMultiFormatReader,
    videoElement: HTMLVideoElement
  ): Promise<IScannerControls> {
    return codeReader.decodeFromVideoDevice(undefined, videoElement, (result) => {
      if (result) {
        setBarcodeData(result.getText())

        cleanupScannerAndStream()

        navigate('/auth/scan-select')
      }
    })
  }

  function cleanupScannerAndStream() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current.stop()
      unsubscribeRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <h1>Barcode Scanner</h1>
      <video ref={(el) => setVideoElement(el)} style={{width: '100%'}} playsInline></video>
    </Authenticator>
  )
}

