import { HttpInterceptorFn } from '@angular/common/http';
import { LOGIN_URL, REGISTER_URL } from '../helpers/globalconstants';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const customHttpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService)
  const urlsNotToBeIntercepted = [LOGIN_URL,REGISTER_URL]
  if(urlsNotToBeIntercepted.includes(req.url)){
    return next(req)
  }

  console.log('Intercepting Request For : ',req.url)
  const token = loginService.getToken()
  console.log('Token Added To The Request Header For : ',req.url)
  const modifiedRequest = req.clone({
    setHeaders:{
      'Authorization':`Bearer ${token}`
    }
  })

  return next(modifiedRequest);
};
