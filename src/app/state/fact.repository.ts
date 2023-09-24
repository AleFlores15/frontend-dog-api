import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  selectEntityByPredicate,
  selectManyByPredicate,
  updateEntities,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { switchMap } from 'rxjs/operators';
import { DogsService } from './dog.service';

import { Facts } from '../models/facts';
import {
    PaginationData,
    selectCurrentPage,
    selectCurrentPageEntities,
    selectPaginationData,
    setCurrentPage,
    setPage,
    updatePaginationData,
    withPagination,
  } from '@ngneat/elf-pagination';
const store = createStore(
    { name: 'facts' },
    withEntities<Facts>(),
    withPagination()
);
  
@Injectable({ providedIn: 'root' })
export class FactRepository {
    facts$ = store.pipe(selectAllEntities());
    activePage$ = store.pipe(selectCurrentPage());
    paginationData$ = store.pipe(selectPaginationData());
    activePageFacts$ = store.pipe(selectCurrentPageEntities());
  
    setActivePage(id: Facts['id']) {
      store.update(setCurrentPage(id));
    }

    setFact(facts: Facts[]) {
        store.update(addEntities(facts));
    }
    /*
    addFacts(page: number, facts: PaginationData & { data: Facts[] }) {
        const { data, ...pagination } = facts;
    
        store.update(
          addEntities(data),
          updatePaginationData(pagination),
          setPage(
            page,
            data.map((c) => c.id)
          )
        );
    }*/
    addFacts(page: number, facts: PaginationData & { data: Facts[] }) {
      const { data, ...pagination } = facts;
  
      store.update(
        upsertEntities(data), // Usamos upsertEntities directamente aquí
        updatePaginationData(pagination),
        setPage(
          page,
          data.map((c) => c.id)
        )
      );
  }
    
    get store() {
      return store;
    }


    update(id: number) {
        store.update(
          updateEntities(id, (entity) => ({
            ...entity,
            status: !entity.status,
          }))
        );
    }

    updateFact(id: number, fact: string) {
      store.update(
        updateEntities(id, (entity) => ({
          ...entity,
          fact: fact,
        }))
      );
    }

    deletebyStatus(id: number) {
      store.update(
        updateEntities(id, (entity) => ({
          ...entity,
          status: false,
        }))
      );
    }



  
}