import {Injectable} from "@angular/core";
import {LazyMapsAPILoaderConfigLiteral} from "@agm/core";
import { AppService } from "src/app/app.service";
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { LoadingData } from "src/app/models/loadingData";
import { Observable } from 'rxjs';
import { apiKeysSelector, loadingSelector } from 'src/app/app.selectors';
import { RequestApiKeys } from "src/app/app.actions";
import { ApiKeys } from "src/app/models/api-keys";

@Injectable({
  providedIn: 'root'
})
export class MapsConfigService implements LazyMapsAPILoaderConfigLiteral{
  
  public apiKey: string = null;
  public libraries: string[] = null;
  
  constructor(private appService: AppService, private store: Store<State>) {
    this.libraries = ['places'];

    // set maps apiKey. These were requested in app.component
    this.store.select(apiKeysSelector()).subscribe((apiKeys: ApiKeys) => {
      if (apiKeys) {
        this.apiKey = apiKeys.mapsApiKey;
      }
    });
  }
}