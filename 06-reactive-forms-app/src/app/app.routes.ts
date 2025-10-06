import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then(mod => mod.countryRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes') //NO HACE FALTA THEN PORQUE LO HEMOS EXPORTADO POR DEFECTO
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then(mod => mod.reactiveRoutes)
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];
