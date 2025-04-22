import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RecipeDetailPage } from '../ui/pages/recipe-detail.page/recipe-detail.page.component';
import { RecipesPage } from '../ui/pages/recipes.page/recipes.page';
import { ChooseRecipePage } from '../ui/pages/choose-recipe.page/choose-recipe.page';
import { RecipeEditPage } from '../ui/pages/recipe-edit.page/recipe-edit.page.component';
import { RecipeVariantDetailPage } from '../ui/pages/recipe-variant-detail.page/recipe-variant-detail.page.component';
import { PlanningPage } from '../ui/pages/planning.page/planning.page';
import { EventEditPage } from '../ui/pages/event-edit.page/event-edit.page';
import { EventPage } from '../ui/pages/event.page/event.page';
import { ShoppingListsPage } from '../ui/pages/shopping-lists.page/shopping-lists.page';
import { MenuOverviewPage } from '../ui/pages/menu-overview.page/menu-overview.page';
import { DayMenuPage } from '../ui/pages/day-menu.page/day-menu.page';
import { MealDetailPage } from '../ui/pages/meal-detail.page/meal-detail.page';
import { VariantEditPage } from '../ui/pages/variant-edit/variant-edit.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recipes',
        loadComponent: () =>
          RecipesPage
      },
      {
        path: 'recipes/new',
        component: RecipeEditPage
      },
      {
        path: 'recipes/:recipeId',
        component: RecipeDetailPage
      },
      {
        path: 'recipes/:recipeId/variants/new',
        component: VariantEditPage
      },
      {
        path: 'recipes/:recipeId/variants/:variantId',
        component: RecipeVariantDetailPage
      },

      {
        path: 'recipes/:recipeId/variants/:variantId/edit',
        component: VariantEditPage
      },
      {
        path: 'recipes/:recipeId/edit',
        component: RecipeEditPage
      },
      {
        path: 'planning',
        component: PlanningPage
      },
      {
        path: 'planning/events/new',
        component: EventEditPage
      },
      {
        path: 'planning/events/:eventId',
        component: EventPage
      },
      {
        path: 'planning/events/:eventId/edit',
        component: EventEditPage
      },
      {
        path: 'planning/events/:eventId/shopping-lists',
        component: ShoppingListsPage

      },
      {
        path: 'planning/events/:eventId/menu',
        component: MenuOverviewPage
      },
      {
        path: 'planning/events/:eventId/menu/:dayMenuId',
        component: DayMenuPage
      },
      {
        path: 'planning/events/:eventId/menu/:dayMenuId/:course/recipes',
        component: ChooseRecipePage
      },
      {
        path: 'planning/events/:eventId/menu/:dayMenuId/:course/recipes/:recipeId',
        component: RecipeDetailPage
      },
      {
        path: 'planning/events/:eventId/menu/:dayMenuId/meal/:mealId',
        component: MealDetailPage
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
