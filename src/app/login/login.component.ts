import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl , FormGroupDirective , NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { Router, RouterModule , ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    console.log(control.get('confirmpassword'));
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  getList: string;
  publicKey: any;
  list: any;
  formGroup: FormGroup;
  emailregex;
  myGroup: FormGroup;
  submitBtnflag: boolean;
  data: any = {};
  errorMatcher;
  // tslint:disable-next-line:variable-name
  data_lilst: any;
  // tslint:disable-next-line:max-line-length
  constructor( private  formBuilder: FormBuilder , private http: HttpClient , private routes: Router ,  ) {
    this.data_lilst = ElementRef;
   }
  ngOnInit(): void {
    this.submitBtnflag = true;
    this.createForm();
    this.publicKey = environment.publickey;
    this.errorMatcher = new CrossFieldErrorMatcher();
  }
  onSubmit(data , formdata): void{
    console.log(formdata);
    this.routes.navigate(['dashboard']);
  }
  getemailList(control): void{
const list = [{name: 'maniprasad@gmail.com'}, {name : 'prakash@jio.com'}];
  }
  createForm(): void{

    this.myGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.pattern(environment.emailPattern) ]),
    password: new FormControl(null , [Validators.required , Validators.minLength(environment.passwordlength)]),
    confirmpassword: new FormControl(null , [Validators.required , Validators.minLength(environment.passwordlength) ]),
    recaptchaReactive: new FormControl(null, Validators.required)
 },
  {validators:  this.checkPasswords  }
);
  }

  // tslint:disable-next-line:typedef
  async resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse);
  }
  // public resolved(res) {
  //   console.log(`Resolved response token: ${res}`);
  //   await this.sendTokenToBackend(res);
  // }

  // tslint:disable-next-line:typedef
  sendTokenToBackend(tok){
    // calling the service and passing the token to the service
    // this.service.sendToken(tok).subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   err => {
    //     console.log(err)
    //   },
    //   () => {}
    // );
  }

  checkPasswords(c: FormGroup): ValidationErrors | null  {
    const password = c.get('password');
    const  confirmpassword  = c.get('confirmpassword');
    if (!password || !confirmpassword ){
      return null;
    }
    if ( password.value !== confirmpassword.value){
      console.log( confirmpassword.value + '---' + password.value  );
      return {noMatch : true};
    }

  }
  doSomething(data): void{
    if (data === 'VALID'){
      this.submitBtnflag = false;
    }
  }

  // tslint:disable-next-line:typedef
  getErrorEmail() {
    return this.myGroup.get('email').hasError('required') ? 'Field is required' :
      this.myGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' : '';
  }
// tslint:disable-next-line:typedef
  getErrorpassword() {
    return this.myGroup.get('password').hasError('required') ? 'Field is required' :
      this.myGroup.get('password').hasError('minlength') ? 'Password is not Satisfied' : '';
  }
  // tslint:disable-next-line:typedef
  getErrorChnpassword() {
    return this.myGroup.get('confirmpassword').hasError('required') ? 'Field is required' :
      this.myGroup.get('confirmpassword').hasError('minlength') ? 'Password is not Satisfied' : '';
  }
}
