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
import { Facts } from '../models/fact';


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

    update(id: number) {
        store.update(updateEntities(id, { status: true }));
    }



  
}