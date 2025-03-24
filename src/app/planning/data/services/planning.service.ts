import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/recipes/data/enums/food-restriction.enum';
import { Observable, of, throwError } from 'rxjs';
import { IShoppingList } from '../interfaces/shopping-list.interface';
import { IDayMenu } from '../interfaces/day-menu.interface';
import { Course } from 'src/app/recipes/data/enums/courses.enum';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
  noData: IPlannedEvent[] = [];
  dummyData: IPlannedEvent[] = [
    {
      id: '1',
      name: 'Tábor 2025',
      dateFrom: new Date('2025-07-01'),
      dateTo: new Date('2025-07-15'),
      participants: [
        { id: 'p1', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p2', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p3', restrictions: [FoodRestriction.NONE] },
        { id: 'p4', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p5', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p6', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p7', restrictions: [FoodRestriction.NONE] },
        { id: 'p8', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p9', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p10', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p11', restrictions: [FoodRestriction.NONE] },
        { id: 'p12', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p13', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p14', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p15', restrictions: [FoodRestriction.LACTOSE_INTOLERANT] },
        { id: 'p16', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p17', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p18', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p19', restrictions: [FoodRestriction.NONE] },
        { id: 'p20', restrictions: [FoodRestriction.GLUTEN_FREE] }
      ],
      menu: [
        {
          id: '1',
          date: new Date('2025-07-01'),
          meals: [
            {
              id: '1',
              course: Course.BREAKFAST,
              chosenRecipes: [
                {
                  recipeId: 'r1',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: '2',
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r2',
                  variants: [
                    {
                      variantId: 'v2',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: '3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: '3',
                  variants: [
                    {
                      variantId: '1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Tábor 2024',
      dateFrom: new Date('2024-07-01'),
      dateTo: new Date('2024-07-15'),
      participants: [
        { id: 'p1', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p2', restrictions: [FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT] },
        { id: 'p3', restrictions: [FoodRestriction.NONE] },
        { id: 'p4', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p5', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p6', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p7', restrictions: [FoodRestriction.NONE] },
        { id: 'p8', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p9', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p10', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p11', restrictions: [FoodRestriction.NONE] },
        { id: 'p12', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p13', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p14', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p15', restrictions: [FoodRestriction.NONE] },
        { id: 'p16', restrictions: [FoodRestriction.GLUTEN_FREE] },
        { id: 'p17', restrictions: [FoodRestriction.VEGAN] },
        { id: 'p18', restrictions: [FoodRestriction.VEGETARIAN] },
        { id: 'p19', restrictions: [FoodRestriction.NONE] },
        { id: 'p20', restrictions: [FoodRestriction.GLUTEN_FREE] }
      ],
      menu: [
        {
          id: '1',
          date: new Date('2025-07-01'),
          meals: [
            {
              id: '1',
              course: Course.BREAKFAST,
              chosenRecipes: [
                {
                  recipeId: 'r1',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: '2',
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r2',
                  variants: [
                    {
                      variantId: 'v2',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: '3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: '3',
                  variants: [
                    {
                      variantId: '1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  getPlannedEvents(): Observable<IPlannedEvent[]> {

    return of(this.dummyData);

  }

  getEvent(id: number): Observable<IPlannedEvent> {
    const event = this.dummyData.find(event => event.id === id.toString());
    if (event) {
      return of(event);
    }
    return throwError(() => new Error('Event not found'));
  }

  saveEvent(event: IPlannedEvent): Observable<IPlannedEvent> {
    const existingEvent = this.dummyData.find(e => e.id === event.id);
    if (existingEvent) {
      Object.assign(existingEvent, event);
      return of(existingEvent);
    }
    else {
      let lastId = this.dummyData[(this.dummyData.length - 1)]?.id;
      if (lastId === undefined) {
        lastId = '0';
      }
      event.id = (parseInt(lastId) + 1).toString();
      this.dummyData.push(event);

      return of(event);
    }
  }

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


  getEventMenu(eventId: string): Observable<IDayMenu[]> {

    const menu = this.dummyData.find(event => event.id === eventId)?.menu;
    if (menu === undefined) {
      return of([]);
    }
    return of(menu);

  }
}