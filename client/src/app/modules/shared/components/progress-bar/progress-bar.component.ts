import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() message = '';
  @Input() color = 'primary';
  @Input() extraClasses = '';
  @Input() tooltipMessage = false;

  constructor() { }

  ngOnInit() {
  }

}
