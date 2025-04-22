import { Injectable } from '@angular/core';
import { IPlannedEvent } from '../interfaces/planned-event.interface';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { Observable, of, throwError } from 'rxjs';
import { IShoppingList } from '../interfaces/shopping-list.interface';
import { IDayMeal, IDayMealRecipe, IDayMenu } from '../interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { ID } from 'src/app/types';
import { isSameDay } from 'date-fns';
import { IBaseService } from '../interfaces/base-service.interface';
import { BasePlanningService } from './base-planning.service';

@Injectable({
  providedIn: 'root'
})
export class PlannedEventService extends BasePlanningService implements IBaseService<IPlannedEvent> {


  getAll(): Observable<IPlannedEvent[]> {

    return of(this.dummyData);

  }

  getById(id: ID): Observable<IPlannedEvent> {
    const event = this.dummyData.find(event => event.id === id.toString());
    if (event) {
      return of(event);
    }
    return throwError(() => new Error('Event not found'));
  }

  saveItem(event: IPlannedEvent): Observable<IPlannedEvent> {
    const existingEvent = this.dummyData.find(e => e.id === event.id);
    if (existingEvent) {
      Object.assign(existingEvent, event);
      return of(existingEvent);
    }
    else {
      let lastId = this.dummyData[(this.dummyData.length - 1)]?.id[1];
      if (lastId === undefined) {
        lastId = '0';
      }
      event.id = 'e' + (parseInt(lastId) + 1).toString();
      this.dummyData.push(event);

      return of(event);
    }
  }

  deleteById(eventId: ID): Observable<IPlannedEvent[]> {
    const index = this.dummyData.findIndex(event => event.id === eventId);
    if (index !== -1) {
      this.dummyData.splice(index, 1);
      return of(this.dummyData);
    }
    return throwError(() => new Error('Event not found'));
  }

  getEventName(eventId: ID): Observable<string> {
    const event = this.dummyData.find(event => event.id === eventId);
    if (event !== undefined) {
      return of(event.name);
    }
    return throwError(() => new Error('Event not found'));
  }


  getEventMenu(eventId: string): Observable<IDayMenu[]> {

    const menu = this.dummyData.find(event => event.id === eventId)?.menu;
    if (menu === undefined) {
      return of([]);
    }
    return of(menu);

  }

}