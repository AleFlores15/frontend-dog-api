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

import { Facts } from '../models/facts';

const store = createStore(
    { name: 'facts' },
    withEntities<Facts>()
);
  
@Injectable({ providedIn: 'root' })
export class FactRepository {
    facts$ = store.pipe(selectAllEntities());

    setFact(facts: Facts[]) {
        store.update(addEntities(facts));
    }


    update(id: number) {
        store.update(
          updateEntities(id, (entity) => ({
            ...entity,
            status: !entity.status,
          }))
        );
    }



  
}