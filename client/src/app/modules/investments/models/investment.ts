import { User } from "../../users/models/user";
import { Team } from "../../teams/models/team";

export class Investment {

  createdBy : User;
  team : Team;
  investmentDistribution : any[];
  investmentAmount : number;
  investmentAmountUnit : string;

  constructor(investmentAmount : number, investmentAmountUnit : string, createdBy : User, team : Team = null, investmentDistribution : any[] = []) {
    this.investmentAmount = investmentAmount;
    this.investmentAmountUnit = investmentAmountUnit;
    this.team = team;
    this.investmentDistribution = investmentDistribution;
    this.createdBy = createdBy;
  }
}