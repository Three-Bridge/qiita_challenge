import {Dispatch, SetStateAction, useEffect, useRef} from 'react'
import {BrowserMultiFormatReader, IScannerControls} from '@zxing/browser'
import {useNavigate} from 'react-router-dom'
import AutoSlider from "../sliderBar/sliderBar.tsx";

type Props = {
  setBarcodeData: Dispatch<SetStateAction<string | null>>
}

export default function BarcodeScreen({setBarcodeData}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const unsubscribeRef = useRef<IScannerControls | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    startScanner(codeReader)
    return(() => {
      cleanupScannerAndStream()
    })
  }, [])

  async function startScanner(codeReader: BrowserMultiFormatReader) {
    try {
      const videoElement = videoRef.current
      if (videoElement) {
        const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
        videoElement.srcObject = stream
        streamRef.current = stream

        unsubscribeRef.current = await handleBarcodeScan(codeReader, videoElement)
      }
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

        navigate('/scan-select')
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
    <div>
      <h1>Barcode Scanner</h1>
      <video ref={videoRef} style={{width: '100%'}} autoPlay playsInline></video>
    </div>
  )
}

