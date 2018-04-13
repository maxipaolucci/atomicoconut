import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import moment = require('moment'); //the import ES6 doesnot work from moment yet
//import { moment } from 'moment';

@Injectable()
export class UtilService {

  private settings : any = {
    flexLayoutBkpts : {
      xs : { min: 0, max: 599 },
      sm : { min: 600, max: 959 },
      md : { min: 960, max: 1279 },
      lg : { min: 1280, max: 1919 },
      xl : { min: 1920, max: 5000 }
    }
  };

  constructor() {}

  isXs() : boolean {
    return window.innerWidth <= this.settings.flexLayoutBkpts.xs.max;
  }

  isSm() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.sm.min && window.innerWidth <= this.settings.flexLayoutBkpts.sm.max;
  } 
  
  isMd() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.md.min && window.innerWidth <= this.settings.flexLayoutBkpts.md.max;
  }

  isLg() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.lg.min && window.innerWidth <= this.settings.flexLayoutBkpts.lg.max;
  }

  isXl() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.xl.min && window.innerWidth <= this.settings.flexLayoutBkpts.xl.max;
  }
  
  isGtXs() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.sm.min;
  }

  isGtSm() : boolean {
    return window.innerWidth >= this.settings.flexLayoutBkpts.md.min;
  }

  /** 
   * Capitalize first letter of a string 
   * 
   * @param word {string} . The string to modify
   * */
  capitalizeFirstLetter(word : string) : string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /**
   * Formast a date object into a string using the provided format
   * 
   * @param {Date} date . The date to format 
   * @param {string} formatStr . The desired format string
   * 
   * @return {string} . The date provided in the desired format.
   */
  formatDate(date : Date, formatStr : string = 'DD/MM/YYYY') {
    return moment(date).format(formatStr); 
  }

  /**
   * Show logs in the console if enabled in the current environment
   * @param type . Error type
   * @param message . The message to show
   * @param params . Any extra parameters to list in the log.
   */
  consoleLog(type : 'log' | 'debug' | 'warn' | 'info' | 'error', message : string, ...params) {
    if (environment.showLogs) {
      console[type](message, params);
    }
  }
}
