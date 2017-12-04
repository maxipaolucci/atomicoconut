import { User } from "../../users/models/user";
import { Team } from "../../teams/models/team";

export class Investment {

  createdBy : User;
  owner : 'me' | 'team';
  team : Team;
  membersPercentage : any;
  investmentAmount : number;
  investmentAmountUnit : string;

  constructor(investmentAmount : number, investmentAmountUnit : string, createdBy : User, owner : 'me' | 'team' = 'me', team : Team = null, membersPercentage : any = null) {
    this.investmentAmount = investmentAmount;
    this.investmentAmountUnit = investmentAmountUnit;
    this.owner = owner;
    this.team = owner === 'team' ? team : null;
    this.membersPercentage = owner === 'team' ? membersPercentage : null;
    this.createdBy = createdBy;
  }
}