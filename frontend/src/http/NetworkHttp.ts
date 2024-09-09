export default interface Http {
  get<T>(url: string): Promise<T>
  post<T>(url: string, body?: string): Promise<T | undefined>
}

export class NetWorkHttp implements Http {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) throw Error('401')
    return await response.json()
  }

  async post<T>(url: string, body?: string): Promise<T | undefined> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: body
    }

    const response = await fetch(url, options)
    if (!response.ok) throw Error('401')

    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      const textResponse = await response.text()
      console.log(textResponse)
    }
  }
}