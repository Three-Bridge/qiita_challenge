import Http, {NetWorkHttp} from '../http/NetworkHttp'

export default interface ThreeBridgeRepository {
    getThreeBridge(): Promise<string[]>

    createCharacter(generatingAlphabet: string): Promise<string>
}

export class DefaultThreeBridgeRepository implements ThreeBridgeRepository {
    constructor(http = new NetWorkHttp()) {
        this.http = http
    }

    http: Http

    async createCharacter(generatingAlphabet: string): Promise<string> {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY
        const characterDescription = `Create a Game Boy-era pixel art character inspired by a creature or animal that starts with the letter ${generatingAlphabet}. The character should have a retro, low-resolution pixel art style, typical of old-school handheld games, with simple but charming details.`

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
            })

            if (!response.ok) {
                throw new Error(`APIリクエストに失敗しました: ${response.statusText}`)
            }

            const result = await response.json()
            return result.data[0].url

        } catch (error) {
            console.error('キャラクター生成中にエラーが発生しました:', error)
            throw error
        }
    }

    getThreeBridge(): Promise<string[]> {
        return this.http.get('/api/threebridge') as Promise<string[]>
    }
}