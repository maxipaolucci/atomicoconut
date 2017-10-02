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
import { AuthGuard } from './auth.guard';
import { CustomMaterialDesignModule } from './modules/custom-material-design/custom-material-design.module';
import { UsersModule } from './modules/users/users.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { CalculatorsModule } from './modules/calculators/calculators.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    UsersModule,
    InvestmentsModule,
    CalculatorsModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  providers: [AppService, AuthResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
