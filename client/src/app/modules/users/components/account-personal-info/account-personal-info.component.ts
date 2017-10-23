import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

@Component({
  selector: 'account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent implements OnInit {

  model : any = { birthday : new Date(1990, 0, 1) };

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
  }

}
