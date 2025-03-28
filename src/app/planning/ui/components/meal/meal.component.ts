import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDayMeal } from 'src/app/planning/data/interfaces/day-menu.interface';
import { Course } from 'src/app/recipes/data/enums/courses.enum';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { ID } from 'src/app/types';
import { IonButtons, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, people, trash } from 'ionicons/icons';

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
    TranslateModule
  ]

})
export class MealComponent implements OnInit {


  @Input({ required: true }) meal!: IDayMeal;

  recipeNames: Array<{ id: ID, name: string; }> = [];

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
        return this.translateService.instant('courses.MORNING-SNACK');
      default:
        return '';

    }

  }

  constructor(private recipesService: RecipesService,
    private translateService: TranslateService
  ) {

    addIcons({ pencil, trash, people });

  }

  ngOnInit() {

    this.getRecipeNames();
  }

  ngOnChanges() {
    this.getRecipeNames();
  }

  getRecipeNames() {
    let recipeIds: ID[] = [];
    this.meal.chosenRecipes.forEach(recipe => {
      recipeIds.push(recipe.recipeId);
    });
    this.recipesService.getRecipesNames(recipeIds).subscribe({
      next: (recipeNames: Array<{ id: ID, name: string; }>) => {
        this.recipeNames = recipeNames;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  editMeal() {
    //todo
  }

  deleteMeal() {
    //todo
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
}
