import { Component, OnInit, Input } from '@angular/core';
import { MainNavigatorService } from './main-navigator.service';
@Component({
  selector: 'main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit {
  
  links : any;
  
  constructor(private mainNavigatorService : MainNavigatorService) { }

  ngOnInit() {
    this.mainNavigatorService.links$.subscribe((links : any[]) => this.links = links);
  }

}
