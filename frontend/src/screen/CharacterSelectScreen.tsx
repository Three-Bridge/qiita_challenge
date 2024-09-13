type Props = {
  barcodeData: string | null
}

export default function CharacterSelectScreen({barcodeData}: Props){

  return(
    <>
      <p>select</p>
      <span>{barcodeData}</span>
    </>
  )
}