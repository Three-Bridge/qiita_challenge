import {Dispatch, SetStateAction, useEffect, useRef} from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser';
import {useNavigate} from 'react-router-dom'

type Props = {
  barcodeData: string | null
  setBarcodeData: Dispatch<SetStateAction<string | null>>
}

export default function BarcodeScreen({barcodeData, setBarcodeData}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    const startScanner = async () => {
      try {
        const videoElement = videoRef.current
        if (videoElement) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          videoElement.srcObject = stream
          streamRef.current = stream

          await codeReader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
            if (result) {
              setBarcodeData(result.getText())
              navigate('/scan-select')
            }
            if (err) {
              // console.warn(err)
            }
          })
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err)
      }
    }

    startScanner()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, [])

  // useEffect(() => {
  //   navigate('/scan-select')
  // }, [barcodeData])

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video ref={videoRef} style={{ width: '100%' }}></video>
      {barcodeData && (
        <div>
          <h2>Scanned Barcode Data:</h2>
          <p>{barcodeData}</p>
        </div>
      )}
    </div>
  );
};

