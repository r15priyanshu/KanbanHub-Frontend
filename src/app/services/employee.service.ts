import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { BACKEND_BASE_URL } from '../helpers/globalconstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  registerEmployee(employeeDto:EmployeeDto):Observable<any>{
    return this.httpClient.post<any>(`${BACKEND_BASE_URL}/employee`,employeeDto)
  }
}
