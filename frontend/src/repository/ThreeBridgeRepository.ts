import Http, {NetWorkHttp} from '../http/NetworkHttp'

export default interface ThreeBridgeRepository {
  getThreeBridge(): Promise<string[]>
  createCharacter(barcode:string): Promise<string>
}

export class DefaultThreeBridgeRepository implements ThreeBridgeRepository {
  constructor(http = new NetWorkHttp()) {
    this.http = http
  }
  http: Http

 async createCharacter(barcode: string): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const characterDescription = `Generate a warrior-like character resembling a crocodile in ASCII art based on the barcode ${barcode}.`;

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: characterDescription,
          n: 1, // 生成する画像の数
          size: '512x512', // PNG画像のサイズ指定
        }),
      });

      if (!response.ok) {
        throw new Error(`APIリクエストに失敗しました: ${response.statusText}`);
      }

      const result = await response.json();
        console.log(result)
      // 生成された画像のURLを取得し、配列として返す
      const imageUrl = result.data[0].url
        console.log(imageUrl)
      return imageUrl;

    } catch (error) {
      console.error('キャラクター生成中にエラーが発生しました:', error);
      throw error;
    }
  }

  getThreeBridge(): Promise<string[]> {
    return this.http.get('/api/threebridge') as Promise<string[]>
  }

}