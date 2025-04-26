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
export class MenuService {

  constructor(private base: BasePlanningService) {

  }



  getEventMenu(eventId: ID): Observable<IDayMenu[]> {

    const menu = this.base.dummyData.find(event => event.id === eventId)?.menu;
    if (menu === undefined) {
      return of([]);
    }
    return of(menu);
  }


  getEventMenuById(eventId: ID, dayMenuId: ID): Observable<IDayMenu> {
    const menu = this.base.dummyData.find(event => event.id === eventId)?.menu.find(menu => menu.id === dayMenuId);
    if (menu !== undefined) {
      return of(menu);
    }
    return throwError(() => new Error('getEventMenuById: Menu not found'));

  }

  getEventMenuForDate(eventId: ID, date: Date): Observable<IDayMenu> {
    const menu = this.base.dummyData.find(event => event.id === eventId)?.menu.find(menu => isSameDay(menu.date, date));
    if (menu !== undefined) {
      return of(menu);
    }
    return throwError(() => new Error('getEventMenuForDate: Menu not found'));

  }


  createDayMenu(eventId: ID, date: Date): Observable<IDayMenu> {
    const event = this.base.dummyData.find(event => event.id === eventId);
    if (event === undefined) {
      return throwError(() => new Error('Event not found'));
    }
    const newMenu: IDayMenu = {
      id: this.base.getNewDayMenuId(),
      date: date,
      meals: []
    };
    event.menu.push(newMenu);
    return of(newMenu);
  }

  updateMenu(dayMenuId: ID, course: Course, chosenRecipes: IDayMealRecipe[]): Observable<IDayMenu> {
    const event = this.base.dummyData.find(event => event.menu.some(menu => menu.id === dayMenuId));
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

  deleteMealFromMenu(eventId: ID, dayMenuId: ID, mealId: ID): Observable<IDayMenu> { //mealID is courseId
    const dayMenu = this.base.dummyData.find(event => event.id === eventId)?.menu.find(menu => menu.id === dayMenuId);
    if (dayMenu === undefined) {
      return throwError(() => new Error('Menu not found'));
    }
    const mealIndex = dayMenu.meals.findIndex(meal => meal.id === mealId);
    if (mealIndex === -1) {
      return throwError(() => new Error('Meal not found'));
    }
    dayMenu.meals.splice(mealIndex, 1);
    return of(dayMenu);
  }

  getMeal(eventId: ID, dayMenuId: ID, mealId: ID): Observable<{ meal: IDayMeal; date: Date; }> {
    const dayMenu = this.base.dummyData.find(event => event.id === eventId)?.menu.find(menu => menu.id === dayMenuId);
    if (dayMenu === undefined) {
      return throwError(() => new Error('Menu not found'));
    }
    const meal = dayMenu.meals.find(meal => meal.id === mealId);
    if (meal === undefined) {
      return throwError(() => new Error('Meal not found'));
    }
    return of({ meal: meal, date: dayMenu.date });
  }

  private addChosenRecipesToMenu(menu: IDayMenu, course: Course, chosenRecipes: IDayMealRecipe[]): void {
    menu.meals.push({
      id: this.base.getNewMealId(),
      course: course,
      chosenRecipes: chosenRecipes
    });
  }

  private updateExistingMeal(meal: IDayMeal, chosenRecipes: IDayMealRecipe[]): void {

    const updatedRecipes = meal.chosenRecipes.map(existingRecipe => {
      const updatedRecipe = chosenRecipes.find(newRecipe => newRecipe.recipeId === existingRecipe.recipeId);
      return updatedRecipe ? updatedRecipe : existingRecipe;
    });

    const newRecipes = chosenRecipes.filter(newRecipe =>
      !meal.chosenRecipes.some(existingRecipe => existingRecipe.recipeId === newRecipe.recipeId)
    );

    meal.chosenRecipes = [...updatedRecipes, ...newRecipes];
  }


}