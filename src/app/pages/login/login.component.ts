import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { LoginRequestDto } from '../../dtos/LoginRequestDto';
import { JWT_TOKEN_HEADER_KEY } from '../../helpers/globalconstants';

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

  constructor(private loginService: LoginService) {}

  handleLogin(loginForm: NgForm) {
    console.log(this.loginData);
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
        console.log(response.body);
        const token = response.headers.get(JWT_TOKEN_HEADER_KEY)
        if(token){
          this.loginService.saveToken(token);
          this.loginService.saveEmployeeDetails(response.body)
        }
        
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
