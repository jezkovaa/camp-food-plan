import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'day-menu',
    loadComponent: () => import('./planning/ui/pages/day-menu/day-menu.page').then( m => m.DayMenuPage)
  },

];
