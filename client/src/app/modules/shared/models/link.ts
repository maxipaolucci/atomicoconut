export class Link {

  displayText : string;
  address : string;
  
  constructor(displayText : string = null, address : string = null) {
    
    this.displayText = displayText;
    this.address = address;
  }
}