import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr'
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router,private _Toaster:ToastrService,private _UserService:UserService) { }
  error:string='';


  loginForm:FormGroup= new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required])
  })
/*-----------Check if User Enter all Required Data--------*/
  requiredValidation(formControlName:string)
  {
    return !! this.loginForm.get(formControlName)?.errors?.required && this.loginForm.get(formControlName)?.touched;
  }
  logIn()
  {
    
      this._AuthService.signIn(this.loginForm.value).subscribe((response)=>{
        if(response.message=='success')
            {
              localStorage.setItem('userToken',response.token);
              this._Toaster.success('You Are Successfully Logged in','Welcome to Noxe',);
              this._UserService.getUserFavorites();// get All favorite Movies that belongs to this User From local store
             
              
              this._Router.navigateByUrl('/home');
            }
            else
            this.error=response.message;
            
            

      })
  }
  signUp()
  {
    this._Router.navigateByUrl('/signup');
  }

  ngOnInit(): void {
  }

}
