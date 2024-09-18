import { useEffect } from "react";
import { DefaultThreeBridgeRepository } from "../repository/ThreeBridgeRepository.ts";

type Props = {
    barcodeData: string | null;
};

export default function CharacterSelectScreen({ barcodeData }: Props) {
    const threeBridgeRepository = new DefaultThreeBridgeRepository();

    useEffect(() => {
        // barcodeDataがnullでない場合にのみ実行
        if (barcodeData) {
            async function displayCharacter(barcode: string) {
                try {
                    // 非同期処理のため、awaitを使って画像URLを取得
                    const imageUrl = await threeBridgeRepository.createCharacter(barcode);
                    console.log(imageUrl)
                    // 画像をDOMに追加して表示
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    document.body.appendChild(img); // 画像をDOMに追加して表示
                } catch (error) {
                    console.error("キャラクター表示中にエラーが発生しました:", error);
                }
            }

            displayCharacter(barcodeData); // 関数を呼び出す
        }
    }, [barcodeData]); // barcodeDataが変更された場合に再実行

    return (
        <>
            <p>Character Select</p>
            <span>{barcodeData}</span>
        </>
    );
}
