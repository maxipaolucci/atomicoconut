import { browser, by, element } from 'protractor';

export class ClientPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}