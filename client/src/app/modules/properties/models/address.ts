export class Address {

  address : string;
  latitude : string;
  longitude : string;

  constructor(address : string = null, latitude : string = null, longitude : string= null) {
    
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}