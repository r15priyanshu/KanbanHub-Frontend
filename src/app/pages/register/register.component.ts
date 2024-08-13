import { Component } from '@angular/core';
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
import Swal from 'sweetalert2';
import { APPLICATION_NAME } from '../../helpers/globalconstants';

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
      Swal.fire({title:'!! Validation Failed !!',text: '!! Please Enter Valid Data !!',icon: 'error'});
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
        Swal.fire({title:'!! Registration Successful !!',text: `Welcome To ${APPLICATION_NAME} , You can now Login !!`,icon: 'success'});
        this.handleReset()
      },
      error: (error) => {
        //console.log('Error');
        Swal.fire({title:'!! Registration Failed !!',text: 'Something Went Wrong !! Try Again Later !!',icon: 'error'});
      },
      complete: () => {},
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
