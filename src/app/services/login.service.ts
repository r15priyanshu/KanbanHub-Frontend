import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BACKEND_BASE_URL,
  EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE,
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE,
  LOGIN_URL,
} from '../helpers/globalconstants';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { LoginRequestDto } from '../dtos/LoginRequestDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public performLogin(loginRequestDto:LoginRequestDto): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(
      LOGIN_URL,
      loginRequestDto,{ observe: 'response' }
    );
  }

  public saveToken(token: string): boolean {
    localStorage.setItem(JWT_TOKEN_KEY_FOR_LOCAL_STORAGE, token);
    return true;
  }

  public getToken(): string | null {
    return localStorage.getItem(JWT_TOKEN_KEY_FOR_LOCAL_STORAGE);
  }

  public isEmployeeLoggedIn(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  public performLogout(): boolean {
    localStorage.removeItem(JWT_TOKEN_KEY_FOR_LOCAL_STORAGE);
    localStorage.removeItem(EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE)
    return true;
  }

  public saveEmployeeDetails(employeeDto: EmployeeDto): boolean {
    localStorage.setItem(
      EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE,
      JSON.stringify(employeeDto)
    );
    return true;
  }

  public getLoggedInEmployeeDetails(): EmployeeDto | null {
    const details = localStorage.getItem(EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE);
    if (!details) {
      this.performLogout();
      return null;
    } else {
      return JSON.parse(details);
    }
  }

  public getLoggedInEmployeeRole():string | null{
   const details = this.getLoggedInEmployeeDetails()
   if(!details){
    return null;
   }else{
      return details.role?.roleName ?? null;
   }
  }
}
