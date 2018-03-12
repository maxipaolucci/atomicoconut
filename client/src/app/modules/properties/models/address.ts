export class Address {

  description : string;
  mapsPlaceId : string;
  latitude : number;
  longitude : number;

  constructor(description : string = null, latitude : number = null, longitude : number = null, mapsPlaceId : string = null) {
    
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.mapsPlaceId = mapsPlaceId;
  }
}