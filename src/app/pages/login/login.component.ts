import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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

  handleLogin(loginForm: NgForm) {
    console.log(this.loginData);
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
