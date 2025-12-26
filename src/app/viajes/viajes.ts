import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViajesService } from '../services/viajes';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-viajes',
  imports: [CommonModule, FormsModule],
  templateUrl: './viajes.html',
  styleUrl: './viajes.css',
})
export class Viajes {

  // VARIABLES
  viajes: any[] = [];
  paginaActual = 1;
  totalPaginas = 0;
  porPagina = 7;
  viaje = {
    nombre: 'Prueba viaje',
    destino: 'Prueba destino',
    fecha_inicio: '2025-01-01',
    fecha_fin: '2025-01-10',
    precio: 5
  }
  viajeSeleccionado: any = null;
  modalEliminar: any;
  mostrarMensajeAgregar = false;
  modalAgregar: any;
  loading = false;
  toastMensaje = '';
  toast: any;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  constructor(private viajesService: ViajesService) {}

  ngOnInit(): void {
    this.cargarViajes();    
  }

  onSearchChange(valor: string) {
    this.searchSubject.next(valor);
  }

  cargarViajes(page: number = 1) {
    this.loading = true;
    this.viajesService
      .obtenerViajes(page, this.porPagina, this.searchTerm)
      .subscribe({
        next: (resp) => {
          this.viajes = resp.data;
          this.paginaActual = resp.current_page;
          this.totalPaginas = resp.last_page;
          console.log(resp);
          
        },
        error: err => console.error(err),
        complete: () => { 
          this.loading = false; 
          console.log('Petición GET completada');
        }
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

  mostrarModalEliminar(viaje: any) {
    this.viajeSeleccionado = viaje;
    const modalElement = document.getElementById('modalEliminarViaje');
    this.modalEliminar = new bootstrap.Modal(modalElement);
    this.modalEliminar.show();
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
      this.cargarViajes();      
      this.viaje = { nombre: '', destino: '', fecha_inicio: '', fecha_fin: '', precio: 0 };
      this.modalAgregar.hide();
      this.mostrarToast('Viaje agregado correctamente 🎉');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    },
    error: () => {
      alert('Error al guardar la clienta');
    }
  });
  };

  eliminarViaje() {
    this.viajesService.eliminarViaje(this.viajeSeleccionado.id).subscribe({
        next: () => {
          this.cargarViajes();
          this.cerrarModalEliminar();
          this.mostrarToast('Viaje eliminado correctamente 🗑️');
        },
        error: (err) => {
          console.error(err);
          alert('Ocurrió un error al eliminar el viaje');
        },
        complete: () => {
          console.log('Petición DELETE completada');
        }
      });
  }

  cerrarModalEliminar() {
    this.modalEliminar.hide();
    this.viajeSeleccionado = null;
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;

    const toastElement = document.getElementById('toastSuccess');
    this.toast = new bootstrap.Toast(toastElement, {
      delay: 3000 // ⏱ 3 segundos
    });

    this.toast.show();
  }

}
