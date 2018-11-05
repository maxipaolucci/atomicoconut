import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() message : string = "";
  @Input() color : string = "primary";
  @Input() extraClasses : string = "";

  constructor() { }

  ngOnInit() {
  }

}
