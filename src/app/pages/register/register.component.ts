import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkConfirmPasswordMismatch } from '../../validators/PasswordMismatchValidator';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDto } from '../../dtos/EmployeeDto';
import { AddressDto } from '../../dtos/AddressDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private snackBar = inject(MatSnackBar);

  registerFormGroup: FormGroup;

  private initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    isManager: 'false',
  };

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.registerFormGroup = this.formBuilder.group(
      {
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
        confirmPassword: new FormControl(
          this.initialFormValues.confirmPassword,
          [Validators.required]
        ),
        isManager: new FormControl(this.initialFormValues.isManager, [
          Validators.required,
        ]),
        city: new FormControl(this.initialFormValues.city, [
          Validators.required,
        ]),
        state: new FormControl(this.initialFormValues.state, [
          Validators.required,
        ]),
      },
      { validators: checkConfirmPasswordMismatch }
    );
  }

  handleRegister() {
    //console.log(this.registerFormGroup.value)
    if (this.registerFormGroup.invalid) {
      this.snackBar.open('!! Validation Failed !! Please Check Your Inputs !!','OK');
      return;
    }

    const { firstName, lastName, email, password, city, state } = this.registerFormGroup.value;
    const addressDto = new AddressDto(city, state);
    const employeeDto = new EmployeeDto(
      firstName,
      lastName,
      email,
      password,
      addressDto
    );

    this.employeeService.registerEmployee(employeeDto).subscribe({
      next: (data) => {
        //console.log(data);
        this.snackBar.open('!! Thanks For Registering !! You Can Now Login !!','OK');
        this.handleReset();
      },
      error: (error) => {
        //console.log('Error');
      },
      complete: () => {console.log('Registration Event Completion !!')},
    });
  }

  handleReset() {
    this.registerFormGroup.reset(this.initialFormValues);
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.registerFormGroup.controls;
  }
}
