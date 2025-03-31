import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { Observable, of, throwError } from 'rxjs';
import { IShoppingList } from '../interfaces/shopping-list.interface';
import { IDayMeal, IDayMealRecipe, IDayMenu } from '../interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { ID } from 'src/app/types';
import { isSameDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor() { }
  noData: IPlannedEvent[] = [];
  dummyData: IPlannedEvent[] = [
    {
      id: 'e1',
      name: 'Tábor 2025',
      dateFrom: new Date('2025-07-05'),
      dateTo: new Date('2025-07-19'),
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
          id: 'd1',
          date: new Date('2025-07-05'),
          meals: [
            {
              id: 'c1',
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
              id: 'd2',
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r2',
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
              id: 'd3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd2',
          date: new Date('2025-07-06'),
          meals: [
            {
              id: 'c1',
              course: Course.BREAKFAST,
              chosenRecipes: [
                {
                  recipeId: 'r2',
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
              id: 'c2',
              course: Course.MORNING_SNACK,
              chosenRecipes: [
                {
                  recipeId: 'r10',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }]
            },
            {
              id: 'c3',
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r2',
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
              id: 'c4',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd3',
          date: new Date('2025-07-06'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd4',
          date: new Date('2025-07-07'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd5',
          date: new Date('2025-07-08'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd6',
          date: new Date('2025-07-09'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd7',
          date: new Date('2025-07-10'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd8',
          date: new Date('2025-07-11'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'd9',
          date: new Date('2025-07-12'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
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
      id: 'e2',
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
          id: 'd1',
          date: new Date('2025-07-01'),
          meals: [
            {
              id: 'c1',
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
              id: 'c2',
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
              id: 'c3',
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v1',
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

  getEvent(id: ID): Observable<IPlannedEvent> {
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

  getEventName(eventId: ID): Observable<string> {
    const event = this.dummyData.find(event => event.id === eventId);
    if (event !== undefined) {
      return of(event.name);
    }
    return throwError(() => new Error('Event not found'));
  }

  getEventMenuById(eventId: ID, dayMenuId: ID): Observable<IDayMenu> {
    const menu = this.dummyData.find(event => event.id === eventId)?.menu.find(menu => menu.id === dayMenuId);
    if (menu !== undefined) {
      return of(menu);
    }
    return throwError(() => new Error('getEventMenuById: Menu not found'));

  }

  getEventMenuForDate(eventId: ID, date: Date): Observable<IDayMenu> {
    const menu = this.dummyData.find(event => event.id === eventId)?.menu.find(menu => isSameDay(menu.date, date));
    if (menu !== undefined) {
      return of(menu);
    }
    return throwError(() => new Error('getEventMenuForDate: Menu not found'));

  }


  updateMenu(dayMenuId: ID, course: Course, chosenRecipes: IDayMealRecipe[]): Observable<IDayMenu> {
    const event = this.dummyData.find(event => event.menu.some(menu => menu.id === dayMenuId));
    if (event === undefined) {
      return throwError(() => new Error('Event not found'));
    }
    const menu = event.menu.find(menu => menu.id === dayMenuId);
    if (menu === undefined) {
      return throwError(() => new Error('Menu not found'));
    }
    const meal = menu.meals.find(meal => meal.course === course);
    if (meal === undefined) {
      this.addChosenRecipesToMenu(menu, course, chosenRecipes);
    }
    else {
      this.updateExistingMeal(meal, chosenRecipes);
    }
    return of(menu);
  }

  private addChosenRecipesToMenu(menu: IDayMenu, course: Course, chosenRecipes: IDayMealRecipe[]): void {
    menu.meals.push({
      id: 'c' + (menu.meals.length + 1),
      course: course,
      chosenRecipes: chosenRecipes
    });
  }

  private updateExistingMeal(meal: IDayMeal, chosenRecipes: IDayMealRecipe[]): void {
    meal.chosenRecipes = meal.chosenRecipes.concat(chosenRecipes);
    //todo not sure
  }
}