import {Injectable} from "@angular/core";
import {LazyMapsAPILoaderConfigLiteral} from "@agm/core";
import { AppService } from "src/app/app.service";
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { LoadingData } from "src/app/models/loadingData";
import { Subscription, Observable } from 'rxjs';
import { apiKeysSelector, loadingSelector } from 'src/app/app.selectors';
import { RequestApiKeys } from "src/app/app.actions";
import { ApiKeys } from "src/app/models/api-keys";

@Injectable()
export class MapsConfig implements LazyMapsAPILoaderConfigLiteral{
  apiKey: string = null;
  libraries: string[] = null;
  loading$: Observable<LoadingData> = null;

  constructor(private appService: AppService, private store: Store<State>) {
    this.apiKey = this.appService.apiKeys.mapsApiKey; // this is fetched by the 
    this.libraries = ['places'];
    console.log("lazy map init with " + this.apiKey);
  }
}