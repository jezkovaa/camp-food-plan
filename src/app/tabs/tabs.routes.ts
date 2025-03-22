import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RecipeDetailPage } from '../recipes/ui/pages/recipe-detail.page/recipe-detail.page.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recipes',
        loadComponent: () =>
          import('../recipes/ui/pages/recipes.page/recipes.page').then((m) => m.RecipesPage),
      },
      {
        path: 'recipes/new',
        loadComponent: () =>
          import('../recipes/ui/pages/recipe-edit.page/recipe-edit.page.component').then((m) => m.RecipeEditPage),
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailPage,
      },
      {
        path: 'recipes/:id/variants/:variantId',
        loadComponent: () =>
          import('../recipes/ui/pages/recipe-variant-detail.page/recipe-variant-detail.page.component').then((m) => m.RecipeVariantDetailPage),
      },
      {
        path: 'recipes/:id/edit',
        loadComponent: () => import('../recipes/ui/pages/recipe-edit.page/recipe-edit.page.component').then((m) => m.RecipeEditPage),
      },
      {
        path: 'planning',
        loadComponent: () =>
          import('../planning/ui/pages/planning.page/planning.page').then((m) => m.PlanningPage),
      },
      {
        path: 'planning/events/new',
        loadComponent: () =>
          import('../planning/ui/pages/event-edit.page/event-edit.page').then((m) => m.EventEditPage),
      },
      {
        path: 'planning/events/:id/edit',
        loadComponent: () =>
          import('../planning/ui/pages/event-edit.page/event-edit.page').then((m) => m.EventEditPage),
      },
      {
        path: '',
        redirectTo: '/tabs/recipes',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/recipes',
    pathMatch: 'full',
  },
];
