import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscacepService {

  private readonly API = 'https://brasilapi.com.br/api/cep/v1/'

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<any>{
    return this.http.get<any>(`${this.API}${valorDigitado}`);
  }
}
