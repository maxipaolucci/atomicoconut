import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { UsersService } from '../../../users/users.service';
import { AppService } from '../../../../app.service';
import { User } from '../../../users/models/user';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../models/property';
import { Subscription } from 'rxjs/Subscription';
import { PropertiesService } from '../../properties.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatTable } from '@angular/material';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'properties-dashboard',
  templateUrl: './properties-dashboard.component.html',
  styleUrls: ['./properties-dashboard.component.scss']
})
export class PropertiesDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('propertiesPaginator') propertiesTablePaginator : MatPaginator;
  @ViewChild('propertiesTable') propertiesTable : MatTable<Property>;
  user : User = null;
  properties : Property[] = [];
  propertiesDataSource : MatTableDataSource<Property> = new MatTableDataSource([]);
  subscription : Subscription = new Subscription();
  getPropertiesServiceRunning : boolean = false;
  propertyTableActionRunning : boolean = false;

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService,  
    private appService : AppService, private propertiesService : PropertiesService, public dialog: MatDialog ) { }


  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: null, selected: true },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]);

    //get authUser from resolver
    const user$ : Observable<User> = this.route.data.map((data : { authUser: User }) =>  {
      this.user = data.authUser;
      
      return data.authUser;
    });

    if (!this.properties.length) {
      this.getProperties(user$);
    }
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging

    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Get my properties from the server
   */
  getProperties(user$ : Observable<User>) {
    const methodTrace = `${this.constructor.name} > getProperties() > `; //for debugging

    this.properties = [];
    this.propertiesDataSource = new MatTableDataSource([]);
    this.propertiesDataSource.paginator = this.propertiesTablePaginator;

    this.getPropertiesServiceRunning = true;
    
    const newSubscription = user$.switchMap((user) => {
      return this.propertiesService.getProperties(user.email);
    }).subscribe(
      (properties : Property[]) => {
        this.properties = properties;
        
        this.propertiesDataSource = new MatTableDataSource(this.properties);
        this.propertiesDataSource.paginator = this.propertiesTablePaginator;

        this.getPropertiesServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getPropertiesServiceRunning = false;
      }
    );
  }

  openDeleteTeamDialog(indexInPage : number, property : Property = null) {
    const methodTrace = `${this.constructor.name} > openDeleteTeamDialog() > `; //for debugging
    
    if (!property) {
      this.appService.consoleLog('error', `${methodTrace} Property is required to delete.`);
      return false;
    }

    //map the index in the table to the indes in the properties array
    let index = indexInPage + this.propertiesTablePaginator.pageIndex * this.propertiesTablePaginator.pageSize;

    this.propertyTableActionRunning = true;
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
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

  delete(index : number, property : Property = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; //for debugging

    this.propertyTableActionRunning = true;

    const newSuscription = this.propertiesService.delete(property.id, this.user.email).subscribe(
      (data : any) => {
        if (data && data.removed > 0) {
          this.properties.splice(index, 1);
          this.propertiesDataSource.data = this.properties;
          //this.propertiesTable.renderRows();
          this.appService.showResults(`Property successfully removed!`, 'success');
        } else {
          this.appService.showResults(`Property could not be removed, please try again.`, 'error');
        }

        this.propertyTableActionRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 471) {
          //property associated to an investment
          this.appService.showResults(error.msg, 'error', 7000);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.propertyTableActionRunning = false;
      }
    );

    this.subscription.add(newSuscription);
  }
}
