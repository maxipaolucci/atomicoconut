import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCryptoRate from './crypto-rate.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CryptoRateEffects } from './crypto-rate.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCryptoRate.cryptoRatesFeatureKey, fromCryptoRate.reducer),
    EffectsModule.forFeature([CryptoRateEffects])
  ]
})
export class CurrencyExchangeModule { }
