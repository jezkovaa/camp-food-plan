import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { Course } from 'src/app/data/enums/courses.enum';


@Injectable({
  providedIn: 'root'
})
export class BasePlanningService {

  variantId = 1;
  recipeId = 1;
  eventId = 1;
  mealId = 1;
  dayMenuId = 1;

  constructor() { }
  noData: IPlannedEvent[] = [];
  dummyData: IPlannedEvent[] = [
    {
      id: this.getNewEventId(),
      name: 'Česká Skalice 2025',
      dateFrom: new Date('2025-06-06'),
      dateTo: new Date('2025-06-08'),
      participants: [
        { id: 'p1', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p2', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p3', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p4', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p5', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p6', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p7', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p8', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p9', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p10', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p11', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p12', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p13', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p14', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p15', restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT]) },
        { id: 'p16', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p17', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p18', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p19', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p20', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) }
      ],
      menu: [
        {
          id: this.getNewDayMenuId(),
          date: new Date('2025-06-06'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r10',
                  variants: [
                    {
                      variantId: 'v10',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r15',
                  variants: [
                    {
                      variantId: 'v15',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2025-06-07'),
          meals: [
            {
              id: this.getNewMealId(),
              course: Course.BREAKFAST,
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
              id: this.getNewMealId(),
              course: Course.MORNING_SNACK,
              chosenRecipes: [
                {
                  recipeId: 'r19',
                  variants: [
                    {
                      variantId: 'v19',
                      portions: 20
                    }
                  ]
                }]
            },
            {
              id: this.getNewMealId(),
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r26',
                  variants: [
                    {
                      variantId: 'v26',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r24',
                  variants: [
                    {
                      variantId: 'v24',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2025-06-08'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r11',
                  variants: [
                    {
                      variantId: 'v11',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },

      ]
    },
    {
      id: this.getNewEventId(),
      name: 'Tábor 2024',
      dateFrom: new Date('2024-07-13'),
      dateTo: new Date('2024-07-27'),
      participants: [
        { id: 'p1', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p2', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT]) },
        { id: 'p3', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p4', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p5', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p6', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p7', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p8', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p9', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p10', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p11', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p12', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p13', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p14', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p15', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p16', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) },
        { id: 'p17', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]) },
        { id: 'p18', restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]) },
        { id: 'p19', restrictions: new Set<FoodRestriction>([FoodRestriction.NONE]) },
        { id: 'p20', restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE]) }
      ],
      menu: [
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-13'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.MORNING_SNACK,
              chosenRecipes: [
                {
                  recipeId: 'r21',
                  variants: [
                    {
                      variantId: 'v21',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: this.getNewMealId(),
              course: Course.LUNCH,
              chosenRecipes: [
                {
                  recipeId: 'r12',
                  variants: [
                    {
                      variantId: 'v12',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: this.getNewMealId(),
              course: Course.SNACK,
              chosenRecipes: [
                {
                  recipeId: 'r27',
                  variants: [
                    {
                      variantId: 'v27',
                      portions: 20
                    }
                  ]
                }
              ]
            },
            {
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r16',
                  variants: [
                    {
                      variantId: 'v16',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-14'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-15'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-16'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-17'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-18'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-19'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-20'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-21'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-22'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-23'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-24'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-25'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-26'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
                      portions: 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: this.getNewDayMenuId(),
          date: new Date('2024-07-27'),
          meals: [
            {
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
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
              id: this.getNewMealId(),
              course: Course.DINNER,
              chosenRecipes: [
                {
                  recipeId: 'r3',
                  variants: [
                    {
                      variantId: 'v3',
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


  getNewEventId() {
    return 'e' + this.eventId++;
  }

  getNewMealId() {
    return 'c' + this.mealId++;
  }

  getNewDayMenuId() {
    return 'd' + this.dayMenuId++;
  }

}