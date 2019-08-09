import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { MatTable, MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../app.service';
import { PropertiesService } from '../../properties.service';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'properties-table',
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss']
})
export class PropertiesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @Input() user: User = null;
  @Input() showActions = true; // if false we hide FAB buttons
  @Input() allowEdition = true; // if false we don't redirect to property edit component when click on adrdresss
  @Input() loadJustUserProperties = false; // if false when it get properties loads current user properties plus properties of investments where the user has a portion of it.

  @Output() selectedProperty: EventEmitter<Property> = new EventEmitter();
  @Output() onPropertiesLoad: EventEmitter<number> = new EventEmitter();
  
  @ViewChild('propertiesPaginator') propertiesTablePaginator: MatPaginator;
  @ViewChild(MatSort) propertiesSort: MatSort;
  
  properties: Property[] = [];
  propertiesDataSource: MatTableDataSource<Property> = new MatTableDataSource([]);
  selection = new SelectionModel<Property>(false, []);

  subscription: Subscription = new Subscription();
  getPropertiesServiceRunning = false;
  propertyTableActionRunning = false;
  displayedColumns: string[] = [];

  constructor(private appService: AppService, private propertiesService: PropertiesService, public dialog: MatDialog, private router: Router) { }


  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    //start listening to Pusher notifications related to this component
    this.bindToPushNotificationEvents();

    this.displayedColumns = ['unit','address'];
    if (this.showActions) {
      this.displayedColumns = this.displayedColumns.concat(['invest', 'delete']);
    }

    // get the properties
    this.getProperties();

    // selection changed
    const newSubcription: Subscription = this.selection.onChange.subscribe((selectionChange: SelectionChange<Property>) => {
        this.selectedProperty.emit(this.selection.selected[0]);
    });
    this.subscription.add(newSubcription);

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

      this.getProperties(); //reload my properties and table datasource
      const unit = data.originalProperty.unit && data.originalProperty.unit != 'null' ? `${data.originalProperty.unit}/` : '';
      this.appService.showResults(`The property ${unit}${data.originalProperty.address} was just update by ${data.name}.`, 'info', 8000);
    });

    // if a property shared with me was deleted by another person then remove it from this table
    this.appService.pusherChannel.bind('property-deleted', data => {
      const propertyIndex = this.properties.findIndex(property => property.id == data.id);
      
      if (propertyIndex >= 0) {
        this.properties.splice(propertyIndex, 1);
        this.propertiesDataSource.data = this.properties;
        const unit = data.unit && data.unit != 'null' ? `${data.unit}/` : '';
        this.appService.showResults(`The property ${unit}${data.address} was just delete by its admin ${data.name}.`, 'info', 8000);
      }
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('property-deleted');
    this.appService.pusherChannel.unbind('property-updated');
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
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

    this.getPropertiesServiceRunning = true;
    
    const newSubscription = this.propertiesService.getProperties$(this.user.email, this.loadJustUserProperties).subscribe(
      (properties: Property[]) => {
        this.properties = properties;
        this.propertiesDataSource.data = properties;
        this.propertiesDataSource.paginator = this.propertiesTablePaginator;

        this.getPropertiesServiceRunning = false;
        this.onPropertiesLoad.emit(properties.length);
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getPropertiesServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

  goToPropertyEdit(property: Property) {
    if (this.allowEdition) {
      this.propertyTableActionRunning = true;
      this.router.navigate(['/properties', property.type, 'edit', property.id]);
    }
  }

  openDeleteTeamDialog(indexInPage: number, property: Property = null) {
    const methodTrace = `${this.constructor.name} > openDeleteTeamDialog() > `; // for debugging
    
    if (!property) {
      this.appService.consoleLog('error', `${methodTrace} Property is required to delete.`);
      return false;
    }

    // map the index in the table to the indes in the properties array
    let index = indexInPage + this.propertiesTablePaginator.pageIndex * this.propertiesTablePaginator.pageSize;
    if (this.propertiesSort.direction === 'desc') {
      index = (-1) * (index + 1); // add one to index and invert sign
    }


    this.propertyTableActionRunning = true;
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
      } else {
        this.propertyTableActionRunning = false;
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete(index: number, propertyToDelete: Property = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.propertyTableActionRunning = true;

    const newSuscription = this.propertiesService.delete$(propertyToDelete.id, this.user.email).subscribe(
      (data: any) => {
        if (data && data.removed > 0) {
          if (!this.propertiesDataSource.filter.length) {
            // data is not filtered, proceed with the easy way
            this.properties.splice(index, 1);
          } else {
            // filtered data, we need to search for the property in order to removeit from the view
            let propertyIndex = 0;
            for (const property of this.properties) {
              if (property.id === propertyToDelete.id) {
                break;
              }

              propertyIndex += 1;
            }

            this.properties.splice(propertyIndex, 1);
          }
          
          this.propertiesDataSource.data = this.properties;
          this.appService.showResults(`Property successfully removed!`, 'success');
        } else {
          this.appService.showResults(`Property could not be removed, please try again.`, 'error');
        }

        this.propertyTableActionRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 475) {
          // property associated to an investment
          this.appService.showResults(error.msg, 'error', 7000);
        } else if (error.codeno === 462) {
          this.appService.showResults(`You cannot delete this property because you are not the creator of it. Ask ${error.data.creator.name} to do it.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.propertyTableActionRunning = false;
      }
    );
    this.subscription.add(newSuscription);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.propertiesDataSource.filter = filterValue; // apply filter
  }
}
