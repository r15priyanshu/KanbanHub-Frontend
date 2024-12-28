import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PERFORM_TOKEN_REFRESH_URL } from '../helpers/globalconstants';
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
