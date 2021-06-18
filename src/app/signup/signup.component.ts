import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../auth.service';
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  taken:boolean=false;// to check iF this email is Registred Before Or NOt 
  constructor(private _AuthService:AuthService ,private _Router:Router,private _Toastr:ToastrService) { }
/*-------Create a New User --------------------*/
  registrationForm:FormGroup=new FormGroup({
    'first_name': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    'last_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern('[A-Z]([a-z]|[0-9]){6,}')])
  });
/*------ Chcek if  there is  any error-----------------------*/
  InputValidation()
  {
    return !! this.registrationForm.errors!=null && this.registrationForm.touched;
  }
  /*-----------Check if this error is required---------------*/
  RequiredValidation(formControlName:string)
  {
    return !! this.registrationForm.get(formControlName)?.touched && this.registrationForm.get(formControlName)?.errors?.required;
  }
  /*---------Check  if this error is minimum Length-------*/
  minimumLengthValidation(formControlName:string)
  {
      return !! this.registrationForm.get(formControlName)?.errors?.minlength && this.registrationForm.get(formControlName)?.touched;
  }
  /*---------Check  if this error is maximum Length-------*/
  maximumLengthValidation(formControlName:string)
  {
     return !! this.registrationForm.get(formControlName)?.errors?.maxlength;
  }
  /*----------------Email Validation-----------------*/
  emailValidation()
  {
    return !! this.registrationForm.get('email')?.errors?.email;
  }
  /*---------------Password Validation----------*/
  passwordValidation()
  {
    return !! this.registrationForm.get('password')?.errors?.pattern;
  }

  /*--------------push New User Data to  Api if its valid -----------------*/
  registration()
  {
    if(this.registrationForm.status=='INVALID')
        return;
    /*------------Check IF all User Data all valid and if Not show him token alert------------*/ 
      this._AuthService.signUp(this.registrationForm.value).subscribe((response)=>{
         if(response.message=='success')
         {
           console.log(response);
           this._Toastr.success('please login','Registered Successfully')
           this._Router.navigateByUrl('/login');
         }
         else
          this.taken=true;

      });
  }



  ngOnInit(): void {
  }

}
