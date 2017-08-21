import { Directive, Input, Attribute } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[equalvalidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {
  
  constructor(@Attribute('equalvalidation') private equalFormControlName: string) {}
 
  validate(control : AbstractControl) : { [key : string] : any } {
    const equalsFormControl = control.root.get(this.equalFormControlName);
    if (equalsFormControl && equalsFormControl.value !== control.value) {
      return { 'equalValidator' : true };
    }

    return null;
  }
}