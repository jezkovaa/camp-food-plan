import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'variant-edit',
    loadComponent: () => import('./ui/pages/variant-edit/variant-edit.page').then( m => m.VariantEditPage)
  }


];
