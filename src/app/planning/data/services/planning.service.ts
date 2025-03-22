import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/recipes/data/enums/food-restriction.enum';
import { Observable, of, throwError } from 'rxjs';
import { last } from 'lodash';

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
}