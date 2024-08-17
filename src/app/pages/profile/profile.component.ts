import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { AddressDto } from '../../dtos/AddressDto';
import { EmployeeDto } from '../../dtos/EmployeeDto';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private snackBar = inject(MatSnackBar);

  updateProfileFormGroup: FormGroup;

  private initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private loginService:LoginService
  ) {
    this.updateProfileFormGroup = this.formBuilder.group(
      {
        firstName: new FormControl(this.initialFormValues.firstName, [
          Validators.required,
          Validators.minLength(3)
        ]),
        lastName: new FormControl(this.initialFormValues.lastName),
        email: new FormControl({value:this.initialFormValues.email,disabled:true},[
          Validators.required,
          Validators.minLength(5)
        ]),
        city: new FormControl(this.initialFormValues.city, [
          Validators.required
        ]),
        state: new FormControl(this.initialFormValues.state, [
          Validators.required
        ]),
      }
    );
  }

  ngOnInit(): void {
    const employee = this.loginService.getLoggedInEmployeeDetails();
    this.updateProfileFormGroup.setValue({firstName:employee?.firstName,lastName:employee?.lastName,email:employee?.email,city:employee?.address.city,state:employee?.address.state})
  }

  handleUpdate() {
    console.log(this.updateProfileFormGroup.value)
    if (this.updateProfileFormGroup.invalid) {
      this.snackBar.open('!! Validation Failed !! Please Check Your Inputs !!','OK');
      return;
    }

    const { firstName, lastName, email, password='', city, state } = this.updateProfileFormGroup.value;
    const addressDto = new AddressDto(city, state);
    const employeeDto = new EmployeeDto(
      firstName,
      lastName,
      email,
      password,
      addressDto
    );

  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.updateProfileFormGroup.controls;
  }
}
