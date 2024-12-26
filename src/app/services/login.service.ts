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
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public isLoggedInSubject = new BehaviorSubject<boolean>(this.isEmployeeLoggedIn());
  public tokenExpirationSetTimout : any = undefined;

  constructor(private httpClient: HttpClient,private router:Router,private tokenService:TokenService) {}

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

  public saveRefreshToken(refreshToken: string): boolean {
    localStorage.setItem(JWT_REFRESH_TOKEN_KEY_FOR_LOCAL_STORAGE, refreshToken);
    return true;
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(JWT_REFRESH_TOKEN_KEY_FOR_LOCAL_STORAGE);
  }

  public isEmployeeLoggedIn(): boolean {
    const token = this.getToken();
    const employee = this.getLoggedInEmployeeDetails();
    return token && employee ? true : false;
  }

  public performLogout(isManualLogout:boolean): boolean {
    localStorage.removeItem(JWT_TOKEN_KEY_FOR_LOCAL_STORAGE);
    localStorage.removeItem(JWT_REFRESH_TOKEN_KEY_FOR_LOCAL_STORAGE);
    localStorage.removeItem(EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE);

    // Clearing the autoLogoutTimer
    if(this.tokenExpirationSetTimout!=undefined){
      clearTimeout(this.tokenExpirationSetTimout)
    }

    this.tokenExpirationSetTimout = undefined
    this.isLoggedInSubject.next(false)
    this.router.navigate(['/login'])
    
    if(isManualLogout){
      console.log("Manual Logout Successful !!")
    }else{
      console.log("Auto Logout Successful !!")
    }
    return true;
  }

  public performAutoLogout(expirationTimeInMilliSeconds:number):boolean{
    console.log("Performing Auto Logout After : ",expirationTimeInMilliSeconds," ms.")
    this.tokenExpirationSetTimout = setTimeout(()=>{
      const userResponse = confirm("Session Expired , Do You Want To Extend Current Session ?");
      if(userResponse){
        console.log("Trying To Extend Session Using Refresh Token !!")
        this.performTokenRefresh();
      }else{
        this.performLogout(false)
      }
    },expirationTimeInMilliSeconds)
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
    console.log('Trying To Decode Token For Extracting Role !!')
    const encodedToken=this.getToken()
    let decodedToken=null
    if(encodedToken){
      try{
        decodedToken=jwtDecode<any>(encodedToken);
        console.log('Token Decoded and Role Extracted !! Role =',decodedToken.role)
        return decodedToken.role
      }catch(error){
        console.log('Error While Decoding Token For Extracting Role !!')
        return null;
      }
    }else{
      return null;
    }
  }

  public getTokenValidityInMilliSeconds():number{
    console.log('Fetching Token From Local Storage And Trying To Decode Token For Extracting Token Validity !!')
    const encodedToken=this.getToken()
    let decodedToken=null
    if(encodedToken){
      try{
        decodedToken=jwtDecode<any>(encodedToken);
        //EXP IN JWT IS IN SECONDS , FIRST CONVERT IT INTO MILLISECONDS
        const exp = decodedToken.exp * 1000
        const expDate = new Date(exp)
        const tokenValidity = expDate.getTime() - Date.now() 
        console.log('Token Decoded and Token Expires At :',expDate," and Token Valid For :",tokenValidity,"ms.")
        return tokenValidity
      }catch(error){
        console.log('Error While Decoding Token Extracting Token Validity !!')
        return 0;
      }
    }else{
      console.log("Token Not Found In Local Storage !!")
      return 0;
    }
  }

  public isTokenValid():{isTokenValid:boolean,tokenValidForMilliSeconds:number}{
    const tokenValidForMilliSeconds:number = this.getTokenValidityInMilliSeconds();
    return tokenValidForMilliSeconds > 0 ? {isTokenValid:true,tokenValidForMilliSeconds:tokenValidForMilliSeconds} : {isTokenValid:false,tokenValidForMilliSeconds:tokenValidForMilliSeconds}
  }

  public performTokenRefresh(){
    const employee = this.getLoggedInEmployeeDetails();
    const refreshToken = this.getRefreshToken();

    //Creating Post Api Call Body
    const tokenDto = new TokenDto()
    tokenDto.refreshToken = refreshToken

    if(employee?.employeeDisplayId && refreshToken){
      this.tokenService.performTokenRefreshByEmployeeDisplayId(employee.employeeDisplayId,tokenDto).subscribe({next:(next)=>{
        console.log("Token Successfully Refreshed !! ")
        const {token:newToken} = next
        if(newToken){
          //Once New Token Is Obtained , Save It in Local Storage.
          this.saveToken(newToken)
          //Now Again, Set Up Auto Logout !!
          this.performAutoLogout(this.getTokenValidityInMilliSeconds())
        }
      },error:(error)=>{
        console.log("Error In Refreshing Token !!")
        this.performLogout(true)
      }})
    }
  }
}
