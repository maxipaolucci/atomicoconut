import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import {AppRoutingModule} from "./app.routing.module";
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CustomMaterialDesignModule } from './custom-material-design/custom-material-design.module';
import { CryptoCurrencyComponent } from './crypto-currency/crypto-currency.component'
import { CrytoCurrencyService } from './crypto-currency/crypto-currency.service';
import { InvestmentsComponent } from './investments/investments.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrencyComponent,
    InvestmentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    CustomMaterialDesignModule
  ],
  providers: [AppService, CrytoCurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
