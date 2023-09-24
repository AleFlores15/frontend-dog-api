import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { take } from 'rxjs';
import { FactRepository } from 'src/app/state/fact.repository';
import { FactService } from 'src/app/state/fact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fact-form',
  templateUrl: './fact-form.component.html',
  styleUrls: ['./fact-form.component.css']
})
export class FactFormComponent {
  newFact: string = '';
  constructor(
    private factService: FactService,
    private keycloakService: KeycloakService,
    public factRepo: FactRepository,
    private router: Router

  ) {}

    //savefacts es para el ingreso manual de datos
    saveFact() {
      if (this.newFact) {
        this.factService.saveFact(this.newFact).subscribe(() => {
          this.newFact = '';
          this.router.navigate(['/']);

        });
      } else {
        console.error('Fact is empty');
      }
    }
      //LOGOUT de keycloak
  logout() {
    this.keycloakService.logout();
  }
  addFact() {
    this.factService.postFact().subscribe(() => {
      this.refreshFacts();
    });
    this.router.navigate(['/']);
  }

  refreshFacts() {
    // Obtener la página actual
    this.factRepo.activePage$.pipe(
        take(1) // Tomamos solo el valor actual
    ).subscribe(currentPage => {
        this.factService.getFacts(currentPage - 1).subscribe();
    });
  }

  goToMain() {
    this.router.navigate(['/']);
  }


}
