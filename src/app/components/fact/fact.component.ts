import { Component, OnInit, inject } from '@angular/core';
import { FactRepository } from 'src/app/state/fact.repository';
import { FactService } from 'src/app/state/fact.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {

  
  contacts$ = this.factRepo.activePageFacts$;
  paginationData$ = this.factRepo.paginationData$;
  sub: Subscription | null = null;

  constructor(
    private factService: FactService,
    public factRepo: FactRepository
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
}
