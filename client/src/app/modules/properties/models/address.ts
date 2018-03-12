export class Address {

  address : string;
  latitude : number;
  longitude : number;

  constructor(address : string = null, latitude : number = null, longitude : number = null) {
    
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}