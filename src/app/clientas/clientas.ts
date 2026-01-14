import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientasService } from '../services/clientas';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ViajesService } from '../services/viajes';
import { Reservas } from '../services/reservas';

@Component({
  selector: 'app-clientas',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientas.html',
  styleUrl: './clientas.css',
})
export class Clientas {

  // VARIABLES
  clientas: any[] = [];
  paginaActual = 1;
  totalPaginas = 0;
  porPagina = 7;
  clienta = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }
  clientaSeleccionada: any = null;
  modalEliminar: any;
  modalAgregar: any;
  searchTerm = '';
  loading = false;
  toastMensaje = '';
  toast: any;
  private searchSubject = new Subject<string>();
  viajesDisponibles: any[] = [];
  viajeSeleccionadoId: number | null = null;


  constructor(private clientaService:ClientasService, private viajeService:ViajesService, private reservaService:Reservas) { }

  ngOnInit(): void {
    this.cargarClientas();

    this.searchSubject
      .pipe(
        debounceTime(400),          // ⏳ espera 400 ms
        distinctUntilChanged()      // evita búsquedas repetidas
      )
      .subscribe((valor) => {
        this.searchTerm = valor;
        this.paginaActual = 1;
        this.cargarClientas();
      });
  }
  onSearchChange(valor: string) {
    this.searchSubject.next(valor);
  }


  cargarClientas(page: number = 1) {
    this.loading = true;
    this.clientaService
      .obtenerClientas(page, this.porPagina, this.searchTerm)
      .subscribe({
        next: (resp) => {
          this.clientas = resp.data;
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

  eliminarClienta() {
    this.clientaService.eliminarClienta(this.clientaSeleccionada.id).subscribe({
        next: () => {
          this.cargarClientas();
          this.cerrarModalEliminar();
          this.mostrarToast('Clienta eliminada correctamente 🗑️');
        },
        error: (err) => {
          console.error(err);
          alert('Ocurrió un error al eliminar la clienta');
        },
        complete: () => {
          console.log('Petición DELETE completada');
        }
      });
  }

  formularioValido(): boolean {
    return (
      this.clienta.nombre.trim() !== '' &&
      this.clienta.apellido.trim() !== '' &&
      this.clienta.email.includes('@') &&
      this.clienta.telefono.trim() !== ''
    );
  }

  mostrarModalEliminar(clienta: any) {
    this.clientaSeleccionada = clienta;
    const modalElement = document.getElementById('modalEliminarClienta');
    this.modalEliminar = new bootstrap.Modal(modalElement);
    this.modalEliminar.show();
  }

  mostrarModalAgregar() {
    const modalElement = document.getElementById('modalAgregarClienta');
    this.modalAgregar = new bootstrap.Modal(modalElement);
    this.modalAgregar.show();
  }

  guardarClienta(){
    if (!this.formularioValido()) {
      alert('Por favor, complete todos los campos del formulario.');
      return;      
    }
    this.clientaService.agregarClienta(this.clienta).subscribe({
    next: () => {
      this.cargarClientas();      
      this.clienta = { nombre: '', apellido: '', email: '', telefono: '' };
      this.modalAgregar.hide();
      this.mostrarToast('Clienta agregada correctamente 🎉');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    },
    error: () => {
      alert('Error al guardar la clienta');
    }
  });
  };

  cerrarModalEliminar() {
    this.modalEliminar.hide();
    this.clientaSeleccionada = null;
  }

  cerrarModalAgregar() {
    this.modalAgregar.hide();
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
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

  abrirModalAsignarViaje(clienta: any) {
    this.clientaSeleccionada = clienta;
    this.viajeSeleccionadoId = null;
    this.viajeService.obtenerTodosLosViajes().subscribe({
      next: (resp) => {
        this.viajesDisponibles = resp.data ?? resp;
        console.log(this.viajesDisponibles);
        
      },
      error: (err) => {
        console.error('Error al obtener viajes disponibles:', err);
        this.mostrarToast('Ocurrió un error al cargar los viajes disponibles.');
      }
    });
  const modalElement = document.getElementById('modalAsignarViaje');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
  }

  asignarViaje() {
    if (!this.clientaSeleccionada || !this.viajeSeleccionadoId) {
      return;      
    }
    const payload = {
      cliente_id: this.clientaSeleccionada.id,
      viaje_id: this.viajeSeleccionadoId,
      estatus: 'confirmada'
    };

    this.reservaService.asignarClienta(payload).subscribe({
      next: () => {
        this.mostrarToast('Clienta asignada al viaje 🎉');
        const modalElement = document.getElementById('modalAsignarViaje');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      },
      error: (err) => {
        if (err.status === 409) {
          this.mostrarToast("La clienta ya esta asignada a este viaje ⚠️")          
        } else {
          console.error(err);
          this.mostrarToast("Error al asignar viaje")
        }
      }
    })
    
  }

  
}

