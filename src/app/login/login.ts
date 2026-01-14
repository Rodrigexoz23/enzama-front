import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = "";
  password = "";
  error = "";
  toastMensaje = '';
  toast: any;

  constructor(private authService: Auth, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.user);
        this.router.navigate(['/clientas']);
        console.log('Login correcto');
      },
      error: () => {        
        this.mostrarToast("Usuario o contraseña incorrectos")
        this.error = 'Credenciales incorrectas';
        console.log('Credenciales incorrectas');
        
      }
    });
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
