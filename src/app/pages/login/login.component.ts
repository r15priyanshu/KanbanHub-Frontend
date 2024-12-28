import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { LoginRequestDto } from '../../dtos/LoginRequestDto';
import { ERR_EMOJI, JWT_REFRESH_TOKEN_HEADER_KEY, JWT_TOKEN_HEADER_KEY, SUCCESS_EMOJI, WARN_EMOJI } from '../../helpers/globalconstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private snackBar = inject(MatSnackBar);

  // Below will be used to store the actual 2 way binded data
  loginData = {
    email: '',
    password: '',
    isManager: 'false',
  };

  // Below will be used to provide initial values to the form again after the reset of form is done
  loginDataInitialValues = {
    email: '',
    password: '',
    isManager: 'false',
  };

  constructor(private loginService: LoginService,private router:Router) {}

  handleLogin(loginForm: NgForm) {
    const { email, password, isManager } = this.loginData;
    if (loginForm.invalid) {
      this.snackBar.open(
        '!! Validation Failed !! Please Check Your Inputs !!',
        'OK'
      );
      return;
    }

    const loginRequestDto = new LoginRequestDto(
      email,
      password,
      JSON.parse(isManager)
    );

    this.loginService.performLogin(loginRequestDto).subscribe({
      next: (response) => {
        const token = response.headers.get(JWT_TOKEN_HEADER_KEY)
        const refreshToken = response.headers.get(JWT_REFRESH_TOKEN_HEADER_KEY)
        if(token && refreshToken){
          this.snackBar.open('!! Successfully Logged In !!',SUCCESS_EMOJI);
          this.loginService.saveToken(token);
          this.loginService.saveRefreshToken(refreshToken);
          this.loginService.saveEmployeeDetails(response.body)
          this.loginService.isLoggedInSubject.next(true)
          this.loginService.performAutoLogout(this.loginService.getTokenValidityInMilliSeconds())
          this.router.navigate(['/admin/dashboard'])
        }
      },
      error: (error) => {
        if(error.status === 400){
            this.snackBar.open('!! Invalid Credentials !! Please Check !!',ERR_EMOJI);
        }else if(error.status === 404){
            this.snackBar.open('!! Email Not Registered !! Please Check !!',WARN_EMOJI);
        }else{
            this.snackBar.open('!! Something Went Wrong While Login !! Please Try After Some Time !!',ERR_EMOJI);
        }  
      }
    });
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
