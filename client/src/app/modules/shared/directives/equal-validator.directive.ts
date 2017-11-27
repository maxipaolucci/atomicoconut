import { Directive, Input, Attribute } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[equalvalidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {
  
  constructor(@Attribute('equalvalidator') public equalFormControlName: string,
      @Attribute('reverse') public reverse: string) {}
  

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }

    return this.reverse === 'true' ? true : false;
  }

  validate(control : AbstractControl) : { [key : string] : any } {
    const equalsFormControl = control.root.get(this.equalFormControlName);
    if (equalsFormControl && equalsFormControl.value !== control.value) {
      if (this.isReverse) {
        equalsFormControl.setErrors({ 'equalvalidator' : true });
      } else {
        return { 'equalvalidator' : true };
      }
    } else if (equalsFormControl) {
      //value is the same on both
      if (this.reverse) {
        delete equalsFormControl.errors['equalvalidator'];
        if (!Object.keys(equalsFormControl.errors).length) {
          equalsFormControl.setErrors(null);
        }
      }
    }
    
    return null;
  }
}