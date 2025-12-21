import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientasService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/clientas';
  constructor(private http: HttpClient) { }

  obtenerClientas(
    page: number = 1,
    perPage: number = 5,
    search: string = ''
  ) {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&per_page=${perPage}&search=${search}`
    );
  }

  agregarClienta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  eliminarClienta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
