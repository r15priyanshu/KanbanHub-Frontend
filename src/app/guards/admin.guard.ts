import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ADMIN_ROLE_NAME } from '../helpers/globalconstants';

export const adminGuard: CanActivateFn = (route, state) => {
  console.log('adminRoute !! Checking access for : '+state.url)
  const loginService = inject(LoginService);
  const router = inject(Router);

  const role = loginService.getLoggedInEmployeeRole();
  if (role !== null && role===ADMIN_ROLE_NAME) {
    console.log('adminGuard : Allowed !!')
    return true;
  } else {
    console.log('adminGuard : Not Allowed !!')
    router.navigate(['/login']);
    return true;
  }
};
