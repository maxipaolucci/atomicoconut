import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ConsoleNotificationTypes, INVESTMENTS_TYPES } from 'src/app/constants';
import { consoleLog } from 'src/app/util';
import * as fromInvestment from  './investment.reducer';
import { CurrencyInvestment } from './models/currencyInvestment';
import { Investment } from './models/investment';
import { PropertyInvestment } from './models/propertyInvestment';

/**
 * Maps an investment plain object retrieved by ngrx to a proper investment object. 
 * We have to do this because we added some logic into the Investment object and so the plain object it does
 * not work any more. This happens with ngrx after update methods cause it does an object serialization that 
 * for some reason does not happen with object creation. So whenever we retrieve and investment object from store,
 * if it is serialized then we convert it to a proper investment object.
 * https://github.com/ngrx/platform/issues/976
 * 
 * @param {any} investment The investment object to map if neccessary as input
 * @returns {Investment} The output as a proper Investment object
 */
const mapInvestmentPlainObjectToInvestmentObject = (investment: any): Investment => {
  const methodTrace = `investment.selectors.ts > mapInvestmentPlainObjectToInvestmentObject() > `; // for debugging
  
  let newInvestmentObject = investment;
  if (investment && !(investment instanceof Investment)) {
    consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Mapping investment plain object to proper investment object...`, investment);
    if (investment.type == INVESTMENTS_TYPES.PROPERTY) {
      newInvestmentObject = new PropertyInvestment(investment.id, investment.investmentAmount, investment.investmentAmountUnit, investment.createdBy, investment.team, investment.investmentDistribution, 
          investment.property, investment.buyingPrice, investment.buyingPriceUnit, investment.buyingDate, 
          investment.type, investment.loanAmount, investment.loanAmountUnit);

    } else if (investment.type == INVESTMENTS_TYPES.CRYPTO || investment.type == INVESTMENTS_TYPES.CURRENCY) {
      newInvestmentObject = new CurrencyInvestment(investment.id, investment.investmentAmount, investment.investmentAmountUnit, investment.createdBy, investment.team, investment.investmentDistribution,
          investment.unit, investment.amount, investment.buyingPrice, investment.buyingPriceUnit, investment.buyingDate, investment.type, 
          investment.loanAmount, investment.loanAmountUnit);
    } else {
      // warning on invalid type
      consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unknown investment type: ${investment.type}.`);
    }
  }

  return newInvestmentObject;
}

export const selectInvestmentsState = createFeatureSelector<fromInvestment.State>("investments");

// This method it is not useful anymore since we need to be sure that the retrieved investments 
// are properly mapped to Investments objects

// export const investmentsSelector = () => createSelector(
//   selectInvestmentsState,
//   fromInvestment.selectAll,
// );

export const investmentsSelector = () => createSelector(
  selectInvestmentsState,
  investmentsState => {
    const investmentsMapped: Investment[] = [];
    Object.values(investmentsState.entities).map(investment => {
      investmentsMapped.push(mapInvestmentPlainObjectToInvestmentObject(investment));
    });

    return investmentsMapped;
  }
);

export const allInvestmentsLoadedSelector = () => createSelector(
  selectInvestmentsState,
  investmentsState => investmentsState.allEntitiesLoaded
);

export const investmentByIdSelector = (id: string) => {
  return createSelector(
    selectInvestmentsState,
    investmentsState => mapInvestmentPlainObjectToInvestmentObject(investmentsState.entities[id])
  )
};

// return the investments on a specific property (PropertyInvestments)
export const investmentsByPropertyIdSelector = (propertyId: string) => {
  return createSelector(
    selectInvestmentsState,
    investmentsState => {
      if (!(investmentsState && investmentsState.entities)) {
        // if nothing yet, return empty array
        return [];
      }

      return Object.values(investmentsState.entities).reduce((investmentsWithProperty: Investment[], investment: any) => {
        if (investment.type == INVESTMENTS_TYPES.PROPERTY && investment.property && investment.property.id === propertyId) {
          return investmentsWithProperty.concat(mapInvestmentPlainObjectToInvestmentObject(investment));
        }
        
        return investmentsWithProperty;
      }, []);
    }
  )
};