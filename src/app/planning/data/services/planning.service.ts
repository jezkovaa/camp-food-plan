import { Injectable } from '@angular/core';
import { PlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/recipes/data/enums/food-restriction.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor() { }
  noData: PlannedEvent[] = [];
  dummyData: PlannedEvent[] = [
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
      ]
    }
  ];

  getPlannedEvents(): Observable<PlannedEvent[]> {

    return of(this.dummyData);

  }
}