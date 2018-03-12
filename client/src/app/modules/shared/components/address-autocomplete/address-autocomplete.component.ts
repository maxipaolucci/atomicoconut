import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { Address } from '../../../properties/models/address';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('addressAutocompleteForm') form;
  @ViewChild("addressInput") addressInput: NgModel;
  @Input() id : string;
  @Input() placeHolder : string;
  @Input() defaultValues : any = null; //the default values of the component model
  //@Input() required : boolean = false;
  @Output() values: EventEmitter<any> = new EventEmitter();

  model : any = {
    address : null,
    latitude : null,
    longitude : null
  };
  options : any[] = [];
  subscription : Subscription = new Subscription();

  private autocompleteService : google.maps.places.AutocompleteService = null;
  private placesService : google.maps.places.PlacesService = null;

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    Object.assign(this.model, this.defaultValues);
    
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));

      this.autocompleteService.getQueryPredictions({input : this.model.address}, 
          (data : google.maps.places.QueryAutocompletePrediction[], status : google.maps.places.PlacesServiceStatus) => {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.options = data;
        } else {
          this.options = [];
        }
      });
    });
    
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    //send data before touching any value
    this.emitValues();

    //after any event in the form we send updated data
    const newSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
      
      if (values.address) {
        let inputAddress = '';
        if (values.address.description) {
          //when the user selected an option from the autocomplete suggestions
          inputAddress = values.address.description;
        } else {
          //this is when the user just started writing but did not selected any suggested option
          inputAddress = values.address.trim();
          this.model.address = inputAddress;
          this.model.longitude = null;
          this.model.latitude = null;
        }

        this.autocompleteService.getQueryPredictions({input : inputAddress}, 
            (data : google.maps.places.QueryAutocompletePrediction[], status : google.maps.places.PlacesServiceStatus) => {
          
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.options = data;
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }

      this.emitValues();
    });
    this.subscription.add(newSubscription);
  }

  /**
   * Using this function we can map our selection to the item description intead the whole object
   */
  autocompleteDisplayFn(place? : google.maps.places.QueryAutocompletePrediction) : string | undefined {
    return place ? place.description : '';
  }

  onOptionSelected(matAutocompleteSelectedEvent : MatAutocompleteSelectedEvent) {
    this.placesService.getDetails({ placeId : matAutocompleteSelectedEvent.option.value.place_id }, 
        (data : google.maps.places.PlaceResult, status : google.maps.places.PlacesServiceStatus) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.model.latitude = data.geometry.location.lat();
        this.model.longitude = data.geometry.location.lng();
        this.model.address = matAutocompleteSelectedEvent.option.value.description;
      } else {
        this.model.latitude = null;
        this.model.longitude = null;
        this.model.address = null;
      }

      this.emitValues();
    });
  }

  emitValues() {
    const newAddress = new Address(this.model.address, this.model.latitude, this.model.longitude);
    
    this.values.emit({
      value : {
        address : newAddress,
        valid : this.form.valid
      } 
    });
  }
}
