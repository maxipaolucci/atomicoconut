import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('editHouseForm') form;
  @ViewChild("addressInput") addressInputElementRef: ElementRef;
  @Input() id : string;
  @Input() placeHolder : string;
  @Input() defaultValues : any = null; //the default values of the component model
  //@Input() required : boolean = false;
  @Output() values: EventEmitter<any> = new EventEmitter();

  model : any = {
    address : null,
    lng : null,
    lat : null
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
      this.emitValues();
    });
    this.subscription.add(newSubscription);

    //Set a keyup event to the address input to look for matching addresses
    const newSubscription2 = Observable.fromEvent(this.addressInputElementRef.nativeElement, 'keyup').debounceTime(50).subscribe((keyboardEvent : KeyboardEvent) => {
      //console.log(keyboardEvent.target['value'].trim());
      
      const inp = String.fromCharCode(keyboardEvent.keyCode);
      if (!(/[a-zA-Z0-9 ]/.test(inp))) {
        return false;
      }

      this.autocompleteService.getQueryPredictions({input : keyboardEvent.target['value'].trim() || ''}, 
          (data : google.maps.places.QueryAutocompletePrediction[], status : google.maps.places.PlacesServiceStatus) => {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.options = data;
        } else {
          this.options = [];
        }
      });
    });
    this.subscription.add(newSubscription2);
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
        this.model.lat = data.geometry.location.lat();
        this.model.lng = data.geometry.location.lng();
        this.model.address = this.addressInputElementRef.nativeElement.value;
      } else {
        this.model.lat = null;
        this.model.lng = null;
        this.model.address = null;
      }

      this.emitValues();
    });
  }

  emitValues() {
    this.values.emit({ 
      value : {
        model : this.model,
        valid : this.form.valid
      } 
    });
  }
}
