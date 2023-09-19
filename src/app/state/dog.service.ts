import { Injectable, TypeDecorator, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Pets } from '../models/pets';
import { DogsRepository } from './dog.repository';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
 constructor(private http: HttpClient, private dogRepository: DogsRepository) {}
    httpClient: HttpClient = inject(HttpClient);

    getPets(): Observable<Pets[]> {
        return this.http.get<ApiResponse<Pets[]>>('http://localhost:8081/api/v1/pet').pipe(
          map((response: ApiResponse<Pets[]>) => response.response || []),
          tap((pets) => this.dogRepository.setPets(pets))
    );

    }
        // actualizar el status llamando el siguiente endpoint  PUT http://localhost:8080/api/v1/pet/{id}
      
    update(id: number): Observable<Pets> {
        return this.http.put <Pets>('http://localhost:8081/api/v1/pet/'+id,{}).pipe(
          tap((Pets) => this.dogRepository.update(id))
    );

    }

    crearnuevo(pet: Pets): Observable<Pets[]> {
        return this.http.post<ApiResponse<Pets[]>>('http://localhost:8081/api/v1/pet',pet).pipe(
          map((response: ApiResponse<Pets[]>) => response.response || []),
          tap((Pets) => this.dogRepository.addPet(pet))
    );

    }


        

}