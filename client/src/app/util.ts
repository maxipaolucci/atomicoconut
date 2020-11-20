import { environment } from 'src/environments/environment';
import { ConsoleNotificationTypes } from './constants';

/**
* Show logs in the console if enabled in the current environment
* @param {ConsoleNotificationTypes} type . Notification type
* @param {string} message . The message to show
* @param {any} params . Any extra parameters to list in the log.
*/
export const consoleLog = (type: ConsoleNotificationTypes, message: string, ...params) => {
 if (environment.showLogs) {
   console[type](message, params);
 }
}