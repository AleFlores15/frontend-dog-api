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
import { Pets } from '../models/pets';


const store = createStore(
    { name: 'dogs' },
    withEntities<Pets>()
);
  
@Injectable({ providedIn: 'root' })
export class DogsRepository {
    pets$ = store.pipe(selectAllEntities());

    setPets(pets: Pets[]) {
        store.update(addEntities(pets));
    }

    addPet(pet: Pets) {
        store.update(addEntities(pet));
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