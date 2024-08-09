import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerFormGroup: FormGroup;
  
  private initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isManager: 'false',
  };

  constructor(private formBuilder: FormBuilder) {
    this.registerFormGroup = this.formBuilder.group({
      firstName: new FormControl(this.initialFormValues.firstName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(this.initialFormValues.lastName),
      email: new FormControl(this.initialFormValues.email, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(this.initialFormValues.password, [
        Validators.required,
        Validators.minLength(5),
      ]),
      isManager: new FormControl(this.initialFormValues.isManager, [
        Validators.required,
      ]),
    });
  }

  handleRegister() {
    console.log(this.registerFormGroup.value);
  }

  handleReset() {
    this.registerFormGroup.reset(this.initialFormValues);
  }

  get controls() {
    return this.registerFormGroup.controls;
  }
}
