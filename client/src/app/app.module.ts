import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { UtilService } from './util.service';
import { CurrencyExchangeService } from './modules/currency-exchange/currency-exchange.service';
import { CustomMaterialDesignModule } from './modules/shared/custom-material-design.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './modules/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './main.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './modules/shared/custom-router-serializer';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { AppEffects } from './app.effects';
import { CurrencyExchangeModule } from './modules/currency-exchange/currency-exchange.module';
import { ServiceWorkerModule } from '@angular/service-worker';


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
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    CurrencyExchangeModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { 
      enabled: environment.pwa, 
      // registrationStrategy: 'registerImmediately' 
    })
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
