import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {

  private apiUrl = 'http://127.0.0.1:8000/api/viajes';
  constructor(private http: HttpClient) { }

  obtenerViajes(
    page: number = 1,
    perPage: number = 5,
    search: string = ''
  ): Observable<any>  {
    return this.http.get<any[]>(
      `${this.apiUrl}?page=${page}&per_page=${perPage}&search=${search}`);
  }

  agregarViaje(viaje: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, viaje);
  }
  eliminarViaje(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
