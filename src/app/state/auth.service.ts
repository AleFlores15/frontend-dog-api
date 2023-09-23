import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../models/response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  httpClient: HttpClient =  inject(HttpClient);
  constructor() { }

  getToken(){
    this.httpClient.get<ApiResponse<string>>('http://localhost:8081/api/v1/auth').pipe(
      map((response: ApiResponse<String>) => response.response)
    ).subscribe((response) => {
      console.log(response);

    });





  }
}
