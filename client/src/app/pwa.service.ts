import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from './app.service';
import { ConsoleNotificationTypes } from './constants';
import { YesNoDialogComponent } from './modules/shared/components/yes-no-dialog/yes-no-dialog.component';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(
      private swUpdate: SwUpdate, 
      private appService: AppService,
      public dialog: MatDialog,
      private appRef: ApplicationRef
  ) {
    if (environment.pwa && this.swUpdate.isEnabled) {
      const methodTrace = `${this.constructor.name} > constructor() > `; // for debugging
      this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Checking for updates...`);

      // check for new version available
      this.swUpdate.available.subscribe(event => {
        this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} New release available!`, event, event.current, event.available);
        this.openUpdateDialog();
      });

      // check for a new version activated
      this.swUpdate.activated.subscribe(event => {
        this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} New version activated!. Time to show a tutorial of new changes`, event, event.previous, event.current);
      });

      this.checkForUpdates();
    } 
  }

  /**
   * Checks for updates in the app every 6 hours. If and update is available then this.swUpdate.available will fire
   */
  checkForUpdates() {
    const methodTrace = `${this.constructor.name} > checkForUpdates() > `; // for debugging
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(30000);//(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Successfully checked for updates!.`);
      });
    });
  }

  openUpdateDialog() {
    const methodTrace = `${this.constructor.name} > openUpdateDialog() > `; // for debugging

    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: { 
        title : 'New version available!',
        message : `Do you want to update atomiCoconut app to its latest version?`
      }
    });

    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      } else {
        this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} User decided to not update the app`);
        
      }
    });

    return false;
  }
}