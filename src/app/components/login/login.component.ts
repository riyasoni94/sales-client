import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Constants } from 'src/app/shared/AppConstant';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isUserValid: boolean = false;

  constructor(private router: Router, private loginAuth: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    pwd: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)])
  });

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
  //Submit login method
  loginSubmitted() {
    this.loginAuth.loginUser([this.loginForm.value.email as string, this.loginForm.value.pwd as string])
      .subscribe((res:any) => {
         let resultRes = JSON.parse(JSON.stringify(res)); //Stringify Json
        if (resultRes.role != "Sales") {
          this.isUserValid = false;
          alert("Login unsuccessfull");
        }
        else {
          this.isUserValid = true;
          this.loginAuth.setToken(resultRes.token); //Set Token
          this.router.navigate(['/dashboard'])
        }
      }, error => {
        if (error.error === Constants.LoginFailed) {
          alert("Login unsuccessfull");
        } 
      
      });
  }
}
