import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clientas } from './clientas/clientas';
import { Navbar } from "./navbar/navbar";
import { Footer } from './footer/footer';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor (public auth: Auth){}
  protected readonly title = signal('enzama-app');
}



