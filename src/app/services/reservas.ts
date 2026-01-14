import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Reservas {
  
  // private apiUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'http://192.168.100.8:8000/api';

  constructor(private http: HttpClient) { }

  obtenerClientasPorViaje(viajeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/viajes/${viajeId}/clientas`);
  }

  asignarClienta(data: {
    cliente_id: number;
    viaje_id: number;
    estatus: string;
  }) {
    return this.http.post(`${this.apiUrl}/reservas`, data);
  }
  
}
