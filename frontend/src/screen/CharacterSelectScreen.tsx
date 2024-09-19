import {useEffect, useState} from "react";
import {DefaultThreeBridgeRepository} from "../repository/ThreeBridgeRepository.ts";

type Props = {
    barcodeData: string | null;
};

export default function CharacterSelectScreen({barcodeData}: Props) {
    const threeBridgeRepository = new DefaultThreeBridgeRepository();
    const [imageUrl, setimageUrl] = useState<string>('')
    const displayCharacter = async (barcodeDate: string | null) => {
        if (barcodeDate) {
            const valueEncodedInBase64 = btoa(barcodeData)
            const generatingAlphabet = valueEncodedInBase64[3]
            try {
                const res = await threeBridgeRepository.createCharacter(generatingAlphabet)
                setimageUrl(res)
            } catch (error) {
                console.error("キャラクター表示中にエラーが発生しました:", error);
            }
        }
    }
    useEffect(() => {
        displayCharacter(barcodeData)
    }, [])

    return (
        <>
            <p>Character Select</p>
            <span>{barcodeData}</span>
            <iframe src={imageUrl} width={'512px'} height={'512px'}/>
        </>
    );
}
