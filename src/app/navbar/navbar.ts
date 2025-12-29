import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.cerrarSesion();
        this.router.navigate(['/login']);
      },
      error: () => {
        // por seguridad cerramos igual
        this.auth.cerrarSesion();
        this.router.navigate(['/login']);
      }
    });
  }
}
