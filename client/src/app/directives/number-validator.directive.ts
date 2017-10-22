import { Directive, Input, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[numberValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
})
export class NumberValidatorDirective {

  constructor(@Attribute('numberValidator') public validationType: string) {}

  validate(control : AbstractControl) : { [key : string] : any } {
    
    let validationObj : any = {};
    if (this.validationType) {
      validationObj = JSON.parse(this.validationType);
    }

    const val: number = control.value;
    if (val) {
      let result : any = {};
      const numberRegExp = new RegExp('^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$');

      if(!numberRegExp.test(val.toString())) {
        return {"numberValidator": true};
      }
      
      if(!isNaN(validationObj.min) && val < validationObj.min) {
        result.numberValidatorMin = true;
      }
      
      if(!isNaN(validationObj.max) && val > validationObj.max) {
        result.numberValidatorMax = true;
      }

      return Object.keys(result).length ? result : null;
    }
    
    return null;
  }

}
