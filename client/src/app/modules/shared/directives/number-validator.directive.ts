import { Directive, Attribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[numberValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
})
export class NumberValidatorDirective {

  

  constructor(@Attribute('numberValidator') public validationType: string) {}

  validate(control: AbstractControl): { [key: string]: any } {
    
    // if the field is empty return valid
    const val: number = control.value;
    if (!val) {
      return null;
    } 

    let validationObj: any = {};
    if (this.validationType) {
      validationObj = JSON.parse(this.validationType);
    }

    // original pattern: ^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$
    let pattern = '^[+-]?[0-9]{1,';
    pattern += !isNaN(validationObj.maxIntegerDigits) && validationObj.maxIntegerDigits > 1 ? validationObj.maxIntegerDigits : 9;
    pattern += '}(?:\.[0-9]{1,';
    pattern += !isNaN(validationObj.maxFractionDigits) && validationObj.maxFractionDigits > 1 ? validationObj.maxFractionDigits : 2;
    pattern += '})?$';

    const numberRegExp = new RegExp(pattern);

    if (!numberRegExp.test(val + '')) {
      return {'numberValidator': true};
    }
    
    const result: any = {};
    if (!isNaN(validationObj.min) && val < validationObj.min) {
      result.numberValidatorMin = true;
    }
    
    if (!isNaN(validationObj.max) && val > validationObj.max) {
      result.numberValidatorMax = true;
    }

    return Object.keys(result).length ? result : null;
  }

}
