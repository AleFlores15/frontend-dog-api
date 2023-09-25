import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  constructor(
    private router: Router,
    private keycloakService: KeycloakService,



  ) {}
  goToForm(){
    this.router.navigate(['/form']);
  }
  goToList(){
    this.router.navigate(['/list']);
  }
  logout() {
    this.keycloakService.logout();
  }


}
