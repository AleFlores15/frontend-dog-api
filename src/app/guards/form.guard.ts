import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class FormGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }
    console.log(route.data);
    console.log(state.url);
    console.log(this.roles);

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    console.log(requiredRoles);
    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }
    console.log(this.roles+"00000000000000000000000000000000");
    // Allow the user to proceed if all the required roles are present.
    const a= requiredRoles.every((role) => this.roles.includes(role));
    console.log(a+"holaaaaaaaaaaaaaaaaaaaaaaaaa");
    if(!a){
      this.router.navigate(['/forbidden']);
      
    }
    return a;

    
  }
}