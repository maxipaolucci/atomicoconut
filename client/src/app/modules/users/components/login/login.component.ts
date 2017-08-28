import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private model : any = {email : '', password : ''};
  private submitted : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { 
    this.submitted = true; 
  }

  resetForm() {
    this.model = {email : '', password : ''};
  }
}
