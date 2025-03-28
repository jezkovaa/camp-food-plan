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
        path: 'planning/events/:id',
        loadComponent: () =>
          import('../planning/ui/pages/event/event.page').then((m) => m.EventPage)
      },
      {
        path: 'planning/events/:id/edit',
        loadComponent: () =>
          import('../planning/ui/pages/event-edit.page/event-edit.page').then((m) => m.EventEditPage),
      },
      {
        path: 'planning/events/:eventId/shopping-lists',
        loadComponent: () =>
          import('../planning/ui/pages/shopping-lists/shopping-lists.page').then((m) => m.ShoppingListsPage),

      },
      {
        path: 'planning/events/:eventId/menu',
        loadComponent: () => import('../planning/ui/pages/menu-overview/menu-overview.page').then(m => m.MenuOverviewPage)
      },
      {
        path: 'planning/events/:eventId/menu/:dayMenuId',
        loadComponent: () => import('../planning/ui/pages/day-menu/day-menu.page').then(m => m.DayMenuPage)
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
