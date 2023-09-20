import { Injectable, TypeDecorator, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
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
  /*
  getFacts(): Observable<Facts[]> {
    return this.http.get<ApiResponse<Paginator<Facts>>>('http://localhost:8081/api/v1/pet/1/fact?page=0&size=4').pipe(
      map((response: ApiResponse<Paginator<Facts>>) => {
        return response.response ? response.response.content : [];
      }),
      tap((facts) => {
        console.log(facts);
        this.factRepository.setFact(facts);
      })
    );
  }*/
  getFacts(page: number = 0): Observable<PaginationData & { data: Facts[] }> {
    return this.http.get<ApiResponse<Paginator<Facts>>>(`http://localhost:8081/api/v1/pet/1/fact?page=${page}&size=3`).pipe(
      map((response: ApiResponse<Paginator<Facts>>) => {
        const content = response.response?.content || [];
        return {
          currentPage: page + 1, // Asumiendo que la API devuelve páginas basadas en 0
          perPage: 4,
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



  

  
  

}
