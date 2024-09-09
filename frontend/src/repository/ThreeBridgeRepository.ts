import Http, {NetWorkHttp} from '../http/NetworkHttp'

export default interface ThreeBridgeRepository {
  getThreeBridge(): Promise<string[]>
}

export class DefaultThreeBridgeRepository implements ThreeBridgeRepository {
  http: Http

  constructor(http = new NetWorkHttp()) {
    this.http = http
  }

  getThreeBridge(): Promise<string[]> {
    return this.http.get('/api/threebridge') as Promise<string[]>
  }

}