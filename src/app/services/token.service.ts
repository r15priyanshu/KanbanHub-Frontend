import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import {
  BACKEND_BASE_URL,
  PERFORM_TOKEN_REFRESH_URL,
  EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE,
  JWT_REFRESH_TOKEN_KEY_FOR_LOCAL_STORAGE,
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE,
  LOGIN_URL,
} from '../helpers/globalconstants';
import { EmployeeDto } from '../dtos/EmployeeDto';
import { LoginRequestDto } from '../dtos/LoginRequestDto';
import { Router } from '@angular/router';
import { TokenDto } from '../dtos/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private httpClient: HttpClient) {}

  performTokenRefreshByEmployeeDisplayId(employeeDisplayId: string,tokenDto:TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(PERFORM_TOKEN_REFRESH_URL(employeeDisplayId),tokenDto);
  }
}
