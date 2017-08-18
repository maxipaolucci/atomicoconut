import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropdownQuestion } from '../../../dynamic-form/question-dropdown';
import { QuestionBase }     from '../../../dynamic-form/question-base';
import { TextboxQuestion }  from '../../../dynamic-form/question-textbox';

@Injectable()
export class RegisterFormQuestionService {

  constructor() { }

  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: '',
        validators: [
          Validators.required,
          Validators.minLength(3)  
        ],
        order: 1
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        validators : [],
        order: 2
      }),

      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        order: 3
      }),

      new TextboxQuestion({
        key: 'passwordConfirm',
        label: 'Confirm password',
        type: 'password',
        validators : [],
        order: 4
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
