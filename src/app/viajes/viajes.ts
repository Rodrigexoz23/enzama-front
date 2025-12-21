import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViajesService } from '../services/viajes';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-viajes',
  imports: [CommonModule, FormsModule],
  templateUrl: './viajes.html',
  styleUrl: './viajes.css',
})
export class Viajes {
  viajes: any[] = [];
  viajesOriginal: any[] = [];
  filtroBusqueda = "";
  viaje = {
    nombre: 'Prueba viaje',
    destino: 'Prueba destino',
    fecha_inicio: '2025-01-01',
    fecha_fin: '2025-01-10',
    precio: 5
  }
  mostrarMensajeAgregar = false;
  modalAgregar: any;

  constructor(private viajesService: ViajesService) {}

  ngOnInit(): void {
    this.cargarViajes();    
  }

  async cargarViajes() {
    this.viajesService.obtenerViajes().subscribe({
      next: (data) => { this.viajes = data },
      error: (err) => console.error(err),
      complete: () => console.log('Petición terminada')
    });
  }

  formularioValido(): boolean {
    return (
      this.viaje.nombre.trim() !== '' &&
      this.viaje.destino.trim() !== '' &&
      this.viaje.fecha_inicio.trim() !== '' &&
      this.viaje.fecha_fin.trim() !== '' &&
      this.viaje.precio > 0
    );
  }

  mostrarModalAgregar() {
    const modalElement = document.getElementById('modalAgregarViaje');
    this.modalAgregar = new bootstrap.Modal(modalElement);
    this.modalAgregar.show();
  }

  guardarViaje() {
    if (!this.formularioValido()) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    } 
    this.viajesService.agregarViaje(this.viaje).subscribe({
      next: () => {
        this.mostrarMensajeAgregar = true;
        this.cargarViajes();
        this.viaje = {nombre: '', destino: '', fecha_inicio: '', fecha_fin: '', precio: 0};
        const modalElement = document.getElementById('modalAgregarViaje');
        const modalAgregar = bootstrap.Modal.getInstance(modalElement);
        this.modalAgregar.hide();
      },
      error: () => {
        alert('Error al guardar el viaje');
      }
    });
  }

}
