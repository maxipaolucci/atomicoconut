import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { UtilService } from './util.service';
import { AuthResolver } from './auth-resolver.service';
import { CurrencyExchangeService } from './modules/investments/currency-exchange.service';
import { CustomMaterialDesignModule } from './modules/shared/custom-material-design.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module'; 
import { InvestmentsModule } from './modules/investments/investments.module';
import { CalculatorsModule } from './modules/calculators/calculators.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './modules/shared/shared.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './modules/shared/custom-router-serializer';
import { HttpErrorInterceptor } from './http-error.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule,
    UsersModule,
    TeamsModule,
    InvestmentsModule,
    CalculatorsModule,
    PropertiesModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  providers: [
    AppService, 
    UtilService, 
    CurrencyExchangeService, 
    AuthResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
