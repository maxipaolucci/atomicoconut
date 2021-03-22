/// <reference types="@types/googlemaps" />
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MapsAPILoader } from '@agm/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Address } from '../../../properties/models/address';
import { NgModel } from '@angular/forms';
import _ from 'lodash';
import { AppService } from 'src/app/app.service';
import { ConsoleNotificationTypes } from 'src/app/constants';

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('addressAutocompleteForm') form;
  @ViewChild('addressInput') addressInput: NgModel;
  @Input() id: string;
  @Input() placeHolder: string;
  @Input() defaultValues: any = null; // the default values of the component model
  @Input() disabled: boolean = false; // use this to make the field editable
  @Output() values: EventEmitter<any> = new EventEmitter();

  model: any = {
    description : null,
    latitude : null,
    longitude : null,
    mapsPlaceId : null
  };
  options: any[] = [];
  subscription: Subscription = new Subscription();

  private autocompleteService: google.maps.places.AutocompleteService = null;
  private placesService: google.maps.places.PlacesService = null;

  constructor(private mapsAPILoader: MapsAPILoader, private appService: AppService) { }

  ngOnInit() {
    Object.assign(this.model, this.defaultValues);
    
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    });
    
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const methodTrace = `${this.constructor.name} > ngAfterViewInit() > `; // for debugging

    // send data before touching any value
    this.emitValues();

    // after any event in the form we send updated data
    const newSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(values => {
      if (values.address) {
        if (values.address.description) {
          if (values.address.mapsPlaceId) {
            // when the user selected an option from the autocomplete suggestions
            this.getPlaceDetails(values.address.mapsPlaceId);
          } else {
            // the user save a custom address. She did not picked it from the suggestion list.
            this.appService.consoleLog(ConsoleNotificationTypes.WARN, `${methodTrace} This property has a custom address that hadn;t been chose from the address autocomplete: ${values.address.description}`);
            this.emitValues(values.address.description);
          }
        } else if (typeof values.address === 'string') {
          // This happens while the user is writing in the field before selecting an option from suggestion list
          
          // retrieve matching places
          this.autocompleteService.getQueryPredictions({input : values.address},
              (data: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
            
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              this.options = data;
            } else {
              this.options = [];
            }
          });

          this.emitValues(values.address);
        } else {
          this.options = [];
          this.emitValues();
        }
      } else {
        this.options = [];
        this.emitValues();
      }
    });
    this.subscription.add(newSubscription);
  }

  /**
   * Using this function we can map our selection to the item description intead the whole object
   */
  autocompleteDisplayFn(place?: google.maps.places.QueryAutocompletePrediction): string | undefined {
    return place ? place.description : '';
  }

  onOptionSelected(matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent) {
    this.getPlaceDetails(matAutocompleteSelectedEvent.option.value.place_id);
  }

  getPlaceDetails(mapsPlaceId: string) {
    const methodTrace = `${this.constructor.name} > getPlaceDetails() > `; // for debugging

    if (!mapsPlaceId) {
      return false;
    }
    
    if (this.placesService) {
      this.placesService.getDetails({ placeId : mapsPlaceId },
          (data: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => {
      
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.model.latitude = data.geometry.location.lat();
          this.model.longitude = data.geometry.location.lng();
          this.model.description = data.formatted_address;
          this.model.mapsPlaceId = mapsPlaceId;
          this.emitValues();
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.WARN, `${methodTrace} None place found for the provided mapsPlaceId for that address: ${this.model.description}`);
          this.model.latitude = null;
          this.model.longitude = null;
          this.model.mapsPlaceId = null;
          this.emitValues(this.model.description);
        }
      });
    } else {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error with PlaceServices object, it is null` );
    }
  }

  emitValues(description: string = null) {
    let address = null;
    let valid = this.form.valid;

    if (this.model.mapsPlaceId) {
      // the user picked from the suggestion list
      address = new Address(this.model.description, this.model.latitude, this.model.longitude, this.model.mapsPlaceId);
    } else if (description) {
      // the user just type a custom address or the getPlaceDetails() didn't found a place fot that mapsPlaceId
      address = new Address(description, null, null, null);
    } else {
      // none of above, return invalid
      valid = false;
    }
    
    this.values.emit({
      value : {
        address,
        valid
      }
    });
  }
}
