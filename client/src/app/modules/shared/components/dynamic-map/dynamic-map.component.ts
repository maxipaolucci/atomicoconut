import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dynamic-map',
  templateUrl: './dynamic-map.component.html',
  styleUrls: ['./dynamic-map.component.scss']
})
export class DynamicMapComponent implements OnInit {

  @Input() latitude = null;
  @Input() longitude = null;
  @Input() markers = [];
  @Input() mapContainerHeight = '300'; //px

  constructor() { }

  ngOnInit() {
  }

}
