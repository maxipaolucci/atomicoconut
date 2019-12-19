import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';


@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('equityForm', {static: false}) form;

  loanAmount = 0;
  discount = 0;
  equity = 0;
  depositAmount = 0;
  usableEquity = 0;
  purchaseCapacity = 0;

  model: any = { 
    purchasePrice : 0,
    marketValue : 0,
    loanCoverage : 80,
    savings : 0,
    renovationCost : 0,
    loanAmountPaid : 0,
    secondLoanCoverage : 65
  };

  subscription: Subscription = new Subscription();

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false },
      { displayName: 'Equity', url: null, selected: true },
      { displayName: 'House figures', url: '/calculators/house-figures', selected: false }
    ]}));
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    const newSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(values => {
      this.loanAmount = values.purchasePrice * (values.loanCoverage / 100);
      this.discount = values.marketValue - values.purchasePrice - values.renovationCost;
      this.depositAmount = values.purchasePrice - this.loanAmount;
      this.equity = values.savings + this.discount + this.depositAmount;
      this.usableEquity = values.marketValue * (this.model.loanCoverage / 100) - this.loanAmount + values.loanAmountPaid + values.savings;
      this.purchaseCapacity = (this.usableEquity * 100) / (100 - values.secondLoanCoverage);
    });
    this.subscription.add(newSubscription);
  }

}
