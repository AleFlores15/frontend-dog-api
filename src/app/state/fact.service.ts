import { Injectable, TypeDecorator, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Facts } from '../models/facts';
import { FactRepository } from './fact.repository';
import { ApiResponse } from '../models/response';
import { Paginator } from '../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  constructor(private http: HttpClient, private factRepository: FactRepository) {}
  httpClient: HttpClient = inject(HttpClient);
  
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
  }

  
  

}
