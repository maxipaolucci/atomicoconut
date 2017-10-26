import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent
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
