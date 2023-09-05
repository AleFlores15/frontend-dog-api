import { Injectable, TypeDecorator, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Facts } from '../models/fact';
import { DogsRepository } from './dog.repository';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
 constructor(private http: HttpClient, private dogRepository: DogsRepository) {}
    httpClient: HttpClient = inject(HttpClient);

    getFacts(): Observable<Facts[]> {
        return this.http.get<ApiResponse<Facts[]>>('http://localhost:8080/api/v1/pet').pipe(
          map((response: ApiResponse<Facts[]>) => response.response || []),
          tap((facts) => this.dogRepository.setFacts(facts))
    );
}
}
