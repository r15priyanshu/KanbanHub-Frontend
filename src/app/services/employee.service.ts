import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { GET_ALL_EMPLOYEE_URL, REGISTER_URL } from '../helpers/globalconstants';
import { firstValueFrom, Observable } from 'rxjs';

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

  getAllEmployeesPromise():Promise<EmployeeDto[]>{
    return firstValueFrom(this.getAllEmployees())
  }
}
