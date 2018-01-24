import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss']
})
export class InfoTooltipComponent implements OnInit {

  @Input() title : string = "";
  @Input() text : string = "";
  @Input() position : string ="above";

  constructor() { }

  ngOnInit() {
  }

}
