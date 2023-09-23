import { Component, OnInit, inject } from '@angular/core';
import { FactRepository } from 'src/app/state/fact.repository';
import { FactService } from 'src/app/state/fact.service';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {

  newFact: string = '';
  contacts$ = this.factRepo.activePageFacts$;
  paginationData$ = this.factRepo.paginationData$;
  sub: Subscription | null = null;

  constructor(
    private factService: FactService,
    public factRepo: FactRepository,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit() {
    this.sub = this.factRepo.activePage$
      .pipe(switchMap((page) => this.factService.getFacts(page - 1))) // Restamos 1 porque la API parece basarse en 0
      .subscribe();
  }

  updateActivePage(page: number) {
    this.factRepo.setActivePage(page);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

// OJOOOOOOOOOOOOOOOOOOOOOOOO
  addFact() {
    this.factService.postFact().subscribe(() => {
        // Después de que el POST sea exitoso, actualizamos la lista de hechos
        this.refreshFacts();
    });
}

refreshFacts() {
    // Obtener la página actual
    this.factRepo.activePage$.pipe(
        take(1) // Tomamos solo el valor actual
    ).subscribe(currentPage => {
        this.factService.getFacts(currentPage - 1).subscribe();
    });
}

saveFact() {
  if (this.newFact) {
    this.factService.saveFact(this.newFact).subscribe(() => {
      // Puedes decidir si deseas actualizar la lista de hechos aquí
      this.refreshFacts();
      this.newFact = ''; // Limpiar el campo de entrada
    });
  } else {
    console.error('Fact is empty');
  }
}
logout() {
  this.keycloakService.logout();
}
}
