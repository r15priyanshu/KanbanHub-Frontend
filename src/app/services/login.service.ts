import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import {
  BACKEND_BASE_URL,
  EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE,
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE,
  LOGIN_URL,
} from '../helpers/globalconstants';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { LoginRequestDto } from '../dtos/LoginRequestDto';
import { AddressDto } from '../dtos/AddressDto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public isLoggedInSubject = new BehaviorSubject<boolean>(this.isEmployeeLoggedIn());

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
      return null;
    } else {
      return JSON.parse(details);
    }
  }

  public getLoggedInEmployeeRole():string | null{
    console.log('Trying To Decode Token !!')
    const encodedToken=this.getToken()
    let decodedToken=null
    if(encodedToken){
      try{
        decodedToken=jwtDecode<any>(encodedToken);
        console.log('Token Decoded and Role Extracted !! Role =',decodedToken.role)
        return decodedToken.role
      }catch(error){
        console.log('Error While Decoding Token !!')
        return null;
      }
    }else{
      return null;
    }
  }
}
