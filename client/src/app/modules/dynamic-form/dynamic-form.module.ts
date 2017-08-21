import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { CustomMaterialDesignModule } from '../../modules/custom-material-design/custom-material-design.module';
import { EqualValidatorDirective } from '../../directives/equal-validator.directive';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    EqualValidatorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialDesignModule
  ],
  exports : [
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  providers: [ QuestionControlService ]
})
export class DynamicFormModule { }
