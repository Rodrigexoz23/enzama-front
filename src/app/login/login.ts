import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private authService: Auth, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.user);
        this.router.navigate(['/clientas']);
        console.log('Login correcto');
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }

}
