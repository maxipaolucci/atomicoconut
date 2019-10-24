import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCryptoRate from './crypto-rate.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CryptoRateEffects } from './crypto-rate.effects';
import * as fromCurrencyRate from './currency-rate.reducer';
import { CurrencyRateEffects } from './currency-rate.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCryptoRate.cryptoRatesFeatureKey, fromCryptoRate.reducer),
    EffectsModule.forFeature([CryptoRateEffects, CurrencyRateEffects]),
    StoreModule.forFeature(fromCurrencyRate.currencyRatesFeatureKey, fromCurrencyRate.reducer)
  ]
})
export class CurrencyExchangeModule { }
