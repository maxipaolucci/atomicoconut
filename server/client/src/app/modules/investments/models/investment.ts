import { User } from '../../users/models/user';
import { Team } from '../../teams/models/team';

export class Investment {

  id: string;
  type: 'crypto' | 'currency' | 'property';
  createdBy: User;
  team: Team;
  investmentDistribution: any[];
  investmentAmount: number; // the amount of money invested. Excluding the amount borrowed (loanAmount)
  investmentAmountUnit: string; 
  loanAmount: number; // the amount of money borrowed from the lender
  loanAmountUnit: string;

  constructor(id: string, type: 'crypto' | 'currency' | 'property', investmentAmount: number, investmentAmountUnit: string, createdBy: User, 
      team: Team = null, investmentDistribution: any[] = [], loanAmount: number = 0, loanAmountUnit: string) {
    this.investmentAmount = investmentAmount;
    this.investmentAmountUnit = investmentAmountUnit;
    this.team = team;
    this.investmentDistribution = investmentDistribution;
    this.createdBy = createdBy;
    this.id = id;
    this.type = type;
    this.loanAmount = loanAmount;
    this.loanAmountUnit = loanAmountUnit;
  }
}
