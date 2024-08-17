import { CanDeactivateFn } from '@angular/router';

export const preventNavigationGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return false;
};
