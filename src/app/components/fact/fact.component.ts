import { Component, inject } from '@angular/core';
import { FactRepository } from 'src/app/state/fact.repository';
import { FactService } from 'src/app/state/fact.service';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent {

  factService: FactService = inject(FactService);
  
  constructor(public factRepo: FactRepository) {}

  ngOnInit(): void {
    this.factService.getFacts().subscribe();
  }
 
}
