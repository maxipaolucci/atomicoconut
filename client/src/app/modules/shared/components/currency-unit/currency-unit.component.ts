import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'currency-unit',
  templateUrl: './currency-unit.component.html',
  styleUrls: ['./currency-unit.component.scss']
})
export class CurrencyUnitComponent implements OnInit {

  @Input() id: string;
  @Input() hint: string;
  @Input() view = 'normal';
  @Input() type = 'currency';
  @Input() placeHolder: string;
  @Input() value: string;
  @Output() newValue: EventEmitter<MatSelectChange> = new EventEmitter();

  model: any = {};

  constructor() { }

  ngOnInit() { }

  onSelectionChange(matSelectChange: MatSelectChange) {
    this.newValue.emit(matSelectChange);
  }
}
