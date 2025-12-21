import { Routes } from '@angular/router';
import { Clientas } from './clientas/clientas';
import { Viajes } from './viajes/viajes';

export const routes: Routes = [
    {path: '', redirectTo: 'clientas', pathMatch: 'full'},
    {path: 'clientas', component: Clientas},
    {path: 'viajes', component: Viajes},

];
