export class ApiKeys {

  mapsApiKey: string;
  pusher: {
    key: string,
    cluster: string,
    channel: string
  }

  constructor(mapsApiKey: string = null, pusher: any = null) {
    this.mapsApiKey = mapsApiKey;
    this.pusher = pusher;
  }
}