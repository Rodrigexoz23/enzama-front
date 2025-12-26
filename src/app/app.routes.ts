import { Routes } from '@angular/router';
import { Clientas } from './clientas/clientas';
import { Viajes } from './viajes/viajes';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'clientas', component: Clientas, canActivate: [authGuard]},
    {path: 'viajes', component: Viajes, canActivate: [authGuard]},

];
