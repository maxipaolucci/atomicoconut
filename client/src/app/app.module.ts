import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AuthResolver } from './auth-resolver.service';
import { CustomMaterialDesignModule } from './modules/custom-material-design/custom-material-design.module';
import { UsersModule } from './modules/users/users.module';
import { CryptoCurrencyComponent } from './investments/crypto-currency/crypto-currency.component'
import { CrytoCurrencyService } from './investments/crypto-currency/crypto-currency.service';
import { InvestmentsComponent } from './investments/investments.component';
import { InvestmentsDashboardComponent } from './investments/investments-dashboard/investments-dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    UsersModule
  ],
  declarations: [
    AppComponent,
    CryptoCurrencyComponent,
    InvestmentsComponent,
    InvestmentsDashboardComponent
  ],
  providers: [AppService, CrytoCurrencyService, AuthResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
