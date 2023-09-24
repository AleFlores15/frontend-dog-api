import { Injectable, TypeDecorator, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe, tap } from 'rxjs';
import { Facts } from '../models/facts';
import { FactRepository } from './fact.repository';
import { ApiResponse } from '../models/response';
import { Paginator } from '../models/paginator';
import { PaginationData } from '@ngneat/elf-pagination';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  constructor(private http: HttpClient, private factRepository: FactRepository) {}
  
  httpClient: HttpClient = inject(HttpClient);

  //Para obtener los datos paginados
  getFacts(page: number = 0): Observable<PaginationData & { data: Facts[] }> {
    return this.http.get<ApiResponse<Paginator<Facts>>>(`http://localhost:8081/api/v1/pet/1/fact?page=${page}&size=3`, ).pipe(
      tap(response => console.log('Received JSON:', response)),
      map((response: ApiResponse<Paginator<Facts>>) => {
        const content = response.response?.content || [];
        return {
          currentPage: page + 1, // Asumiendo que la API devuelve páginas basadas en 0
          perPage: 3,
          total: response.response?.totalElements || 0,
          lastPage: Math.ceil((response.response?.totalElements || 0) / 4),
          data: content
        };
      }),
      tap((paginationData) => {
        this.factRepository.addFacts(page + 1, paginationData);
      })
    );
  }


  //El de abajo es el post del input (el manual)
  saveFact(fact: string): Observable<void> {
    const body = { fact }; 
    return this.http.post<void>('http://localhost:8081/api/v1/pet/1/savefact', body);
  }

  //El de abajo es el post del boton (el automatico, que llama a la API externa desde el backend)
  postFact(): Observable<void> {
    return this.http.post<void>('http://localhost:8081/api/v1/pet/1/fact', {});
  }

  //para el put xd
  updateFact(id: number, fact: string): Observable<void> {
    const body = { fact }; // Ajusta esto según la estructura que tu backend espera
    return this.http.put<void>(`http://localhost:8081/api/v1/fact/${id}`, body).pipe(
      tap(() => this.factRepository.updateFact(id, fact))
    );
  }
  
  deletebyStatus(id: number): Observable<void> {
   return this.http.put<void>(`http://localhost:8081/api/v1/delete/fact/${id}`, {}).pipe(
      tap(() => this.factRepository.deletebyStatus(id))
    );
  }


  

  
  

}
