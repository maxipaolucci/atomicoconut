import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class MainNavigatorService {
  
  private linksSource: BehaviorSubject<any[]>; // Observable source
  links$: Observable<any[]>; // Observable stream

  constructor() {
    this.linksSource = new BehaviorSubject<any[]>(null);
    this.links$ = this.linksSource.asObservable();
  }

  // links source feeder
  setLinks(newLinks: any[]) {
    this.linksSource.next(newLinks);
  }

  // add a link to the source feeder
  appendLink(link: any) {
    const currentLinks: any[] = this.linksSource.getValue();
    currentLinks.push(link);
    this.setLinks(currentLinks);
  }
}
