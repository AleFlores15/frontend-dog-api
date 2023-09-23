import { Component, OnInit, inject } from '@angular/core';
import { FactRepository } from 'src/app/state/fact.repository';
import { FactService } from 'src/app/state/fact.service';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { EditFactDialogComponent } from '../edit-fact-dialog/edit-fact-dialog.component';
import { Facts } from 'src/app/models/facts';
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
    private keycloakService: KeycloakService,
    public dialog: MatDialog
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

// Aquí abajo se llama a facts y cada que se hace un post, se llama a refreshFacts y se refresca pa pagina
  addFact() {
    this.factService.postFact().subscribe(() => {
        this.refreshFacts();
    });
  }

  //el refresh facts es oara actualizar la lista de facts
  refreshFacts() {
      // Obtener la página actual
      this.factRepo.activePage$.pipe(
          take(1) // Tomamos solo el valor actual
      ).subscribe(currentPage => {
          this.factService.getFacts(currentPage - 1).subscribe();
      });
  }

  //savefacts es para el ingreso manual de datos
  saveFact() {
    if (this.newFact) {
      this.factService.saveFact(this.newFact).subscribe(() => {
        this.refreshFacts();
        this.newFact = ''; 
      });
    } else {
      console.error('Fact is empty');
    }
  }

  //LOGOUT de keycloak
  logout() {
    this.keycloakService.logout();
  }

// para el modal 
  openEditDialog(fact: Facts) {
    const dialogRef = this.dialog.open(EditFactDialogComponent, {
    data: { fact }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.factService.updateFact(fact.id, result).subscribe(() => {
        this.refreshFacts();
      });
    }
  });
  }
}
