import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  selectEntityByPredicate,
  selectManyByPredicate,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { switchMap } from 'rxjs/operators';
import { DogsService } from './dog.service';

interface Facts {
  id : number;
  facts: string[];
  start_date: string;
  status: boolean;
  petId: number;
}

const store = createStore(
    { name: 'dogs' },
    withEntities<Facts>()
);
  
@Injectable({ providedIn: 'root' })
export class DogsRepository {
    facts$ = store.pipe(selectAllEntities());



    setFacts(facts: Facts[]) {
        store.update(addEntities(facts));
    }

    addFact(fact: Facts) {
        store.update(addEntities(fact));
    }

  
}