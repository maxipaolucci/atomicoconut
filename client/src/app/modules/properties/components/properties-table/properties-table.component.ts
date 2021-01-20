import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import _ from 'lodash';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { AppService } from '../../../../app.service';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SnackbarNotificationTypes, ConsoleNotificationTypes, RoutingPaths } from 'src/app/constants';
import { RequestAll, RequestDelete, ResetAllEntitiesLoaded } from '../../property.actions';
import { propertiesSelector } from '../../property.selectors';
import { PropertiesService } from '../../properties.service';

@Component({
  selector: 'properties-table',
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss']
})
export class PropertiesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @Input() showActions = true; // if false we hide FAB buttons
  @Input() allowEdition = true; // if false we don't redirect to property edit component when click on adrdresss
  @Input() loadJustUserProperties = false; // if false when it get properties loads current user properties plus properties of investments where the user has a portion of it.

  @Output() selectedProperty: EventEmitter<Property> = new EventEmitter();
  @Output() onPropertiesLoad: EventEmitter<number> = new EventEmitter();
  
  @ViewChild('propertiesPaginator') propertiesTablePaginator: MatPaginator;
  @ViewChild(MatSort) propertiesSort: MatSort;
  
  user: User = null;
  properties: Property[] = [];
  properties$: Observable<Property[]> = null;
  propertiesDataSource: MatTableDataSource<Property> = new MatTableDataSource([]);
  selection = new SelectionModel<Property>(false, []);

  subscription: Subscription = new Subscription();
  propertyTableActionRunning = false;
  displayedColumns: string[] = [];
  loading$: Observable<LoadingData>;

  constructor(
    private appService: AppService,
    public dialog: MatDialog, 
    private router: Router,
    private store: Store<State>,
    public propertiesService: PropertiesService
  ) { }


  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.loading$ = this.store.select(loadingSelector());

    this.displayedColumns = ['unit','address'];
    if (this.showActions) {
      this.displayedColumns = this.displayedColumns.concat(['invest', 'delete']);
    }

    // get the user (this is fast)
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));

    //start listening to Pusher notifications related to this component
    this.appService.pusherReady$.pipe(
      first((ready: boolean) => ready == true) // when pusher is ready then bind and stop listening to this
    ).subscribe((ready: boolean) => this.bindToPushNotificationEvents());

    this.getProperties();

    // selection changed
    const newSubscription: Subscription = this.selection.changed.subscribe((selectionChange: SelectionChange<Property>) => {
        this.selectedProperty.emit(this.selection.selected[0]);
    });
    this.subscription.add(newSubscription);

    // set filter predicate function to look just in the address field
    this.propertiesDataSource.filterPredicate = (data: Property, filter: string) => {
      const address = data.address.description.toLowerCase().trim();
      const unit = data.unit ? data.unit.toLowerCase().trim() : '';
      const filterStr = filter.toLowerCase().trim(); 
      if (address.indexOf(filterStr) > -1 || unit.indexOf(filterStr) > -1) {
        return true;
      }

      return false;
    };

    // this is needed because for fields where the header does not match the property of the data for sorting as address <> description
    this.propertiesDataSource.sortingDataAccessor = (data: Property, sortHeaderId: string) => {
      if (sortHeaderId === 'address') {
        return data.address.description;
      } else if (sortHeaderId === 'unit') {
        return data.unit;
      }

      return 1;
    };
  }

  ngAfterViewInit(): void {
    this.propertiesDataSource.sort = this.propertiesSort;
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    // if a property shared with me was updated by another person then update values shown in this table
    this.appService.pusherChannel.bind('property-updated', data => {
      let reloadProperties = this.properties.some((property : Property) => property.id == data.property.id);
      if (!reloadProperties) {
        // check if the updated property is now shared with me, we need to reload my list of properties
        reloadProperties = data.property.sharedWith.some(person => person.email === this.user.email);  
      }

      if (!reloadProperties) {
        // nothing to update nor notify
        return;
      }
      
      this.store.dispatch(new ResetAllEntitiesLoaded()); // to force to reload from server
      this.getProperties(); //reload my properties and table datasource
      const unit = data.originalProperty.unit && data.originalProperty.unit != 'null' ? `${data.originalProperty.unit}/` : '';
      this.appService.showResults(`The property ${unit}${data.originalProperty.address} was just update by ${data.name}.`, SnackbarNotificationTypes.INFO, 8000);
    });

    // if a property shared with me was deleted by another person then remove it from this table
    this.appService.pusherChannel.bind('property-deleted', data => {
      const propertyIndex = this.properties.findIndex(property => property.id == data.id);
      
      if (propertyIndex >= 0) {
        this.properties.splice(propertyIndex, 1);
        this.propertiesDataSource.data = this.properties;
        const unit = data.unit && data.unit != 'null' ? `${data.unit}/` : '';
        this.appService.showResults(`The property ${unit}${data.address} was just delete by its admin ${data.name}.`, SnackbarNotificationTypes.INFO, 8000);
      }
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    if (this.appService.pusherChannel) {
      this.appService.pusherChannel.unbind('property-deleted');
      this.appService.pusherChannel.unbind('property-updated');
    }
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  /**
   * Get my properties from the server
   */
  getProperties() {
    const methodTrace = `${this.constructor.name} > getProperties() > `; // for debugging

    this.properties = [];
    this.propertiesDataSource.data = [];
    this.propertiesDataSource.paginator = this.propertiesTablePaginator;

    this.store.dispatch(new RequestAll({ userEmail: this.user.email, forceServerRequest: false }));
    this.properties$ = this.store.select(propertiesSelector());
    const newSubscription: Subscription = this.properties$.subscribe((properties: Property[]) => {
      this.properties = properties;
      this.propertiesDataSource.data = properties;
      this.propertiesDataSource.paginator = this.propertiesTablePaginator;
      this.onPropertiesLoad.emit(properties.length);
    }, 
    (error: any) => {
      this.properties = [];
    });
    this.subscription.add(newSubscription);
  }

  goToPropertyEdit(property: Property) {
    if (this.allowEdition) {
      this.propertyTableActionRunning = true;
      this.router.navigate([RoutingPaths.PROPERTIES, property.type, 'edit', property.id]);
    }
  }

  openDeleteDialog(indexInPage: number, property: Property = null) {
    const methodTrace = `${this.constructor.name} > openDeleteDialog() > `; // for debugging
    
    if (!property) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Property is required to delete.`);
      return false;
    }

    // map the index in the table to the indes in the properties array
    let index = indexInPage + this.propertiesTablePaginator.pageIndex * this.propertiesTablePaginator.pageSize;
    if (this.propertiesSort.direction === 'desc') {
      index = (-1) * (index + 1); // add one to index and invert sign
    }

    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: {
        title : 'Delete property', 
        message : `Are you sure you want to delete this property forever?`
      }
    });

    const newSubscription = yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete(index, property);
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete(index: number, propertyToDelete: Property = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.store.dispatch(new RequestDelete({ userEmail: this.user.email, id: propertyToDelete.id }));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.propertiesDataSource.filter = filterValue; // apply filter
  }
}
