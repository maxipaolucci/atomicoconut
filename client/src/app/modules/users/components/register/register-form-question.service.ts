import { Injectable } from '@angular/core';
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
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required : true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required : true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'passwordConfirm',
        label: 'Confirm password',
        type: 'password',
        required : true,
        order: 4
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
