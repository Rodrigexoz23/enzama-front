import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clientas } from './clientas/clientas';
import { Navbar } from "./navbar/navbar";
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('enzama-app');
}
