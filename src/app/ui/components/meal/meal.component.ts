import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDayMeal } from 'src/app/data/interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { ID } from 'src/app/types';
import { IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronDown, eye, pencil, people, trash } from 'ionicons/icons';
import { IDayMealRecipeNames } from 'src/app/data/interfaces/day-meal-names.interface';
import { RestrictionComponent } from '../restriction/restriction.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,


    CommonModule,
    TranslateModule,

    RestrictionComponent
  ]

})

export class MealComponent implements OnInit {


  @Input({ required: true }) meal!: IDayMeal;
  @Output() deleteMealEvent = new EventEmitter<ID>();

  recipeNames: IDayMealRecipeNames[] = [];

  detailsVisible = false;

  get getCourseName(): string {
    switch (this.meal.course) {
      case Course.BREAKFAST:
        return this.translateService.instant('courses.BREAKFAST');
      case Course.LUNCH:
        return this.translateService.instant('courses.LUNCH');
      case Course.DINNER:
        return this.translateService.instant('courses.DINNER');
      case Course.SNACK:
        return this.translateService.instant('courses.SNACK');
      case Course.MORNING_SNACK:
        return this.translateService.instant('courses.MORNING_SNACK');
      default:
        return '';

    }

  }

  get getIcon(): string {
    return this.detailsVisible ? 'chevron-up' : 'chevron-down';
  }

  constructor(private recipesService: RecipesService,
    private translateService: TranslateService
  ) {

    addIcons({ pencil, trash, people, chevronDown });

  }

  ngOnInit() {

    this.getRecipeNames();
  }

  ngOnChanges() {
    this.getRecipeNames();

  }

  getRecipeNames() {

    this.recipesService.getNames(this.meal.chosenRecipes).subscribe({
      next: (recipeNames: IDayMealRecipeNames[]) => {
        this.recipeNames = recipeNames;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  editMeal() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    //todo
  }

  deleteMeal() {

    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur(); // Remove focus from the button
    this.deleteMealEvent.emit(this.meal.id);
  }

  viewMeal() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    //todo
    this.detailsVisible = !this.detailsVisible;
  }

  getPortions(recipeId: ID): number {
    const usedRecipe = this.meal.chosenRecipes.find(recipe => recipe.recipeId === recipeId);
    if (usedRecipe === undefined) {
      throw new Error('Meal with given recipe id not found - should not happen');
    }
    let portions = 0;
    usedRecipe.variants.forEach(variant => {
      portions += variant.portions;
    });
    return portions;
  }

  getPortionsForVariant(recipeId: ID, variantId: ID): number {
    const usedRecipe = this.meal.chosenRecipes.find(recipe => recipe.recipeId === recipeId);
    if (usedRecipe === undefined) {
      throw new Error('Meal with given recipe id not found - should not happen');
    }
    const usedVariant = usedRecipe.variants.find(variant => variant.variantId === variantId);
    if (usedVariant === undefined) {
      throw new Error('Meal with given recipe id and variant id not found - should not happen');
    }
    return usedVariant.portions;
  }

}



