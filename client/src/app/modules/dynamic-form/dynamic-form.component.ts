import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChange }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() postSubmitErrors : string[] = [];
  @Output() formData: EventEmitter<any> = new EventEmitter();
  private form: FormGroup;
  private payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  ngOnChanges(changes : {[propKey : string] : SimpleChange}) {
    
    // if (changes.postSubmitErrors && !changes.postSubmitErrors.isFirstChange()) {
      
    // }

    // //OR....

    // for (let propName in changes) {
    //   let changedProp = changes[propName];
    //   let to = JSON.stringify(changedProp.currentValue);
    //   if (changedProp.isFirstChange()) {
    //     console.log(`Initial value of ${propName} set to ${to}`);
    //   } else {
    //     let from = JSON.stringify(changedProp.previousValue);
    //     console.log(`${propName} changed from ${from} to ${to}`);
    //   }
    // }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.formData.emit(this.form.value); //send data to the component that use the dynamic form compoennt
  }
}