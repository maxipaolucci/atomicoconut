import { Component, OnInit, EventEmitter, Input, Output, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit {

  @Input() id : string;
  @Input() placeHolder : string;
  @Input() value : string;
  @Output() newValue: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter();

  @ViewChild("addressInput") addressInputElementRef: ElementRef;

  model : any = {
    address : null,
    lng : null,
    lat : null
  };

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const dropdown = new google.maps.places.Autocomplete(this.addressInputElementRef.nativeElement);
      dropdown.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place : google.maps.places.PlaceResult = dropdown.getPlace();
          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.model.lat = place.geometry.location.lat();
          this.model.lng = place.geometry.location.lng();
          this.model.address = this.addressInputElementRef.nativeElement.value;
        });
      });  
    });
    
  }

  onChange(matAutocompleteSelectedEvent : MatAutocompleteSelectedEvent) {
    this.newValue.emit(matAutocompleteSelectedEvent);
  }

}
