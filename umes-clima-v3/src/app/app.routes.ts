import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'registros',
    loadComponent: () => import('./pages/registros/registros.page').then( m => m.RegistrosPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
