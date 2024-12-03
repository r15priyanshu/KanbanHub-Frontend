import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { AddressDto } from '../../dtos/AddressDto';
import { EmployeeDto } from '../../dtos/EmployeeDto';
import { LoginService } from '../../services/login.service';
import { DEFAULT_PROFILE_PIC_IMAGE_FORM_FIELD_NAME, DEFAULT_PROFILE_PIC_IMAGE_LOCATION, DEFAULT_PROFILE_PIC_IMAGE_NAME, GET_PROFILE_PIC_URL } from '../../helpers/globalconstants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public defaultProfilePicImageName:string = DEFAULT_PROFILE_PIC_IMAGE_NAME
  public selectedFile: File | null = null;
  @ViewChild('fileInput')
  private fileInput: ElementRef<HTMLInputElement> | undefined;
  public profilePicLocation?:string;
  private snackBar = inject(MatSnackBar);
  public employee:EmployeeDto | null | undefined = null;
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
    this.employee = this.loginService.getLoggedInEmployeeDetails();
    if(this.employee){
      this.profilePicLocation = this.updateProfilePicLocation(this.employee);
    }
    this.updateProfileFormGroup.setValue({firstName:this.employee?.firstName,lastName:this.employee?.lastName,email:this.employee?.email,city:this.employee?.address.city,state:this.employee?.address.state})
  }

  private updateProfilePicLocation(employee:EmployeeDto) : string{
    if(employee?.profilePic===DEFAULT_PROFILE_PIC_IMAGE_NAME){
      return DEFAULT_PROFILE_PIC_IMAGE_LOCATION
    }else if(employee?.employeeDisplayId){
      return GET_PROFILE_PIC_URL(employee.employeeDisplayId);
    }else{
      return ""
    }
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
    
    if(this.employee?.employeeDisplayId){
      this.employeeService.updateEmployeeByEmployeeDisplayId(this.employee.employeeDisplayId,employeeDto).subscribe({
        next:(next)=>{
          this.snackBar.open('!! Profile Updated Successfully !!','OK');
          this.performMandatoryOperationsAfterProfileUpdate(next)
        },error:(error)=>{
          console.log(error);
        }
      })
    }
    
  }

  handleProfilePictureRemove(){
    if(this.employee?.employeeDisplayId){
      this.employeeService.removeProfilePictureByEmployeeDisplayId(this.employee.employeeDisplayId).subscribe({
        next:(next)=>{
          this.snackBar.open('!! Profile Picture Successfully Removed !!','OK');
          if(next.data?.employee){
            this.performMandatoryOperationsAfterProfileUpdate(next.data?.employee)
          }
        },error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  handleOnFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleProfilePictureUpload(){
    if(this.selectedFile && this.employee?.employeeDisplayId){
      const formData:FormData = new FormData();
      formData.append(DEFAULT_PROFILE_PIC_IMAGE_FORM_FIELD_NAME,this.selectedFile);

      this.employeeService.updateProfilePictureByEmployeeDisplayId(this.employee.employeeDisplayId,formData).subscribe({
        next:(next)=>{
          this.snackBar.open('!! Profile Picture Successfully Uploaded !!','OK');
          if(next.data?.employee){
            this.performMandatoryOperationsAfterProfileUpdate(next.data.employee)
            this.clearFileInput()
          } 
        },error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  clearFileInput(){
    this.selectedFile = null;
    if(this.fileInput){
       this.fileInput.nativeElement.value=''
    }
  }

  performMandatoryOperationsAfterProfileUpdate(employee:EmployeeDto){
    this.employee=employee;
    this.profilePicLocation=this.updateProfilePicLocation(employee)
    this.loginService.saveEmployeeDetails(employee);
    this.loginService.isLoggedInSubject.next(true);
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.updateProfileFormGroup.controls;
  }
}
