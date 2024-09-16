type Props = {
  barcodeData: string | null
}

export default function CharacterSelectScreen({barcodeData}: Props){

  return(
    <>
      <p>character select</p>
      <span>{barcodeData}</span>
    </>
  )
}