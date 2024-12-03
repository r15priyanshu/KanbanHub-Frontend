import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { GET_ALL_EMPLOYEE_URL, REGISTER_URL, REMOVE_PROFILE_PICTURE_BY_DISPLAY_ID_URL, UPDATE_EMPLOYEE_BY_DISPLAY_ID_URL, UPDATE_PROFILE_PICTURE_BY_DISPLAY_ID_URL } from '../helpers/globalconstants';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiResponseDto } from '../dtos/ApiResponseDto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  registerEmployee(employeeDto:EmployeeDto):Observable<any>{
    return this.httpClient.post<any>(REGISTER_URL,employeeDto)
  }

  getAllEmployees():Observable<EmployeeDto[]>{
    return this.httpClient.get<any>(GET_ALL_EMPLOYEE_URL)
  }

  updateEmployeeByEmployeeDisplayId(employeeDisplayId:string,employeeDto:EmployeeDto):Observable<EmployeeDto>{
    return this.httpClient.put<EmployeeDto>(UPDATE_EMPLOYEE_BY_DISPLAY_ID_URL(employeeDisplayId),employeeDto);
  }

  updateProfilePictureByEmployeeDisplayId(employeeDisplayId:string,formData:FormData):Observable<ApiResponseDto>{
    return this.httpClient.post<ApiResponseDto>(UPDATE_PROFILE_PICTURE_BY_DISPLAY_ID_URL(employeeDisplayId),formData);
  }

  removeProfilePictureByEmployeeDisplayId(employeeDisplayId:string):Observable<ApiResponseDto>{
    return this.httpClient.put<ApiResponseDto>(REMOVE_PROFILE_PICTURE_BY_DISPLAY_ID_URL(employeeDisplayId),null);
  }

  getAllEmployeesPromise():Promise<EmployeeDto[]>{
    return firstValueFrom(this.getAllEmployees())
  }
}
