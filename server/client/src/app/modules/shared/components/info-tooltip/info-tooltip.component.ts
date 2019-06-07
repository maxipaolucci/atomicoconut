import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss']
})
export class InfoTooltipComponent implements OnInit {

  @Input() title = '';
  @Input() text = '';
  @Input() position = 'above';

  constructor() { }

  ngOnInit() {
  }

}
