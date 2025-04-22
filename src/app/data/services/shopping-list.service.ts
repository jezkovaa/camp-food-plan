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

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService extends BasePlanningService {


  getShoppingLists(eventId: string): Observable<IShoppingList[]> {


    const shoppingLists: IShoppingList[] = [
      {
        id: '1',
        name: 'Nákup 1',
        date: new Date('2025-06-30'),
        items: [
          { id: '1', name: 'Jablká', amount: 10, unit: 'kg', checked: false },
          { id: '2', name: 'Banány', amount: 5, unit: 'kg', checked: true },
          { id: '3', name: 'Chlieb', amount: 20, unit: 'bochníkov', checked: false }
        ]
      },
      {
        id: '2',
        name: 'Nákup 2',
        date: new Date('2025-07-05'),
        items: [
          { id: '4', name: 'Mlieko', amount: 15, unit: 'litrov', checked: true },
          { id: '5', name: 'Vajcia', amount: 200, unit: 'kusov', checked: false },
          { id: '6', name: 'Maslo', amount: 5, unit: 'kg', checked: true }
        ]
      },
      {
        id: '3',
        name: 'Nákup 3',
        date: new Date('2025-07-10'),
        items: [
          { id: '7', name: 'Paradajky', amount: 10, unit: 'kg', checked: false },
          { id: '8', name: 'Syr', amount: 8, unit: 'kg', checked: true },
          { id: '9', name: 'Cestoviny', amount: 15, unit: 'kg', checked: false }
        ]
      }
    ];

    return of(shoppingLists);

  }

}