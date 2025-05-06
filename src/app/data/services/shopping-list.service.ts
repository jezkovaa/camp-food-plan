import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { Observable, of, throwError } from 'rxjs';
import { IShoppingList } from '../interfaces/shopping-list.interface';
import { IDayMeal, IDayMealRecipe, IDayMenu } from '../interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { ID } from 'src/app/types';
import { isSameDay } from 'date-fns';
import { BasePlanningService } from './base-planning.service';
import { BaseRecipeService } from './base-recipe.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private base: BasePlanningService, private baseRecipes: BaseRecipeService, private translateService: TranslateService) {
  }


  getShoppingLists(eventId: string): Observable<IShoppingList[]> {


    const event = this.base.dummyData.find(event => event.id === eventId);
    if (event === undefined || event.dateFrom === null || event.dateTo === null) {
      console.error('Event not found or invalid date range');
      return of([]);
    }
    const ingredientsMap = new Map<string, { amount: number; unit: string; }>();

    event.menu.forEach((dayMenu: IDayMenu) => {
      dayMenu.meals.forEach((meal: IDayMeal) => {
        meal.chosenRecipes.forEach((recipe: IDayMealRecipe) => {

          recipe.variants.forEach(variant => {
            if (variant.variantId === null) {
              return;
            }
            const recipeVariant = this.baseRecipes.dummyRecipes.find(r => r.id === recipe.recipeId)?.variants.find(v => v.id === variant.variantId);
            if (recipeVariant) {
              recipeVariant.ingredients.forEach(ingredient => {
                if (ingredientsMap.has(ingredient.name)) {
                  const existing = ingredientsMap.get(ingredient.name)!;
                  if (ingredient.quantity !== null) {
                    existing.amount += ingredient.quantity * variant.portions;
                  }
                } else {
                  if (ingredient.quantity === null || ingredient.unit === null) {
                    return;
                  }
                  ingredientsMap.set(ingredient.name, { amount: ingredient.quantity, unit: ingredient.unit });
                }
              });
            }
          });

        });
      });
    });

    const shoppingList: IShoppingList = {
      id: 'generated',
      name: 'Generated Shopping List',
      date: new Date(),
      items: Array.from(ingredientsMap.entries()).map(([name, { amount, unit }]) => ({
        id: name,
        name,
        amount,
        unit,
        checked: false
      }))
    };

    const dividedShoppingLists: IShoppingList[] = [];
    const maxItemsPerList = 10;


    let currentList: IShoppingList = {
      id: 'generated-1',
      name: `${this.translateService.instant('planning.event.shopping-lists.list')} ${dividedShoppingLists.length + 1}`,
      date: event.dateFrom,
      items: []
    };

    shoppingList.items.forEach((item, index) => {
      if (currentList.items.length >= maxItemsPerList && event.dateFrom) {
        dividedShoppingLists.push(currentList);
        const currentDate = new Date(event.dateFrom.getTime());
        currentDate.setDate(currentDate.getDate() + dividedShoppingLists.length);
        currentList = {
          id: `generated-${dividedShoppingLists.length + 1}`,
          name: `${this.translateService.instant('planning.event.shopping-lists.list')} ${dividedShoppingLists.length + 1}`,
          date: currentDate,
          items: []
        };
      }
      currentList.items.push(item);
    });

    if (currentList.items.length > 0) {
      dividedShoppingLists.push(currentList);
    }

    return of(dividedShoppingLists);

  }

}