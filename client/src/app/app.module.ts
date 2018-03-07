import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { UtilService } from './util.service';
import { AuthResolver } from './auth-resolver.service';
import { CurrencyExchangeService } from './modules/investments/currency-exchange.service';
import { AuthGuard } from './auth.guard';
import { CustomMaterialDesignModule } from './modules/shared/custom-material-design.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module'; 
import { InvestmentsModule } from './modules/investments/investments.module';
import { CalculatorsModule } from './modules/calculators/calculators.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './modules/shared/shared.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    UsersModule,
    TeamsModule,
    InvestmentsModule,
    CalculatorsModule,
    SharedModule,
    PropertiesModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDKc7OEe0rN7hXZx8T-8ngEoK7dLGxyp18",
      libraries: ["places"]
    })
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  providers: [AppService, UtilService, CurrencyExchangeService, AuthResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
