import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit {
  
  @Input() links : any;
  
  constructor() { }

  ngOnInit() { }

}
