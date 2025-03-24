import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonRow, IonCol, IonGrid, IonButton, IonIcon } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { IDayMenu } from 'src/app/planning/data/interfaces/day-menu.interface';
import { Course } from 'src/app/recipes/data/enums/courses.enum';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';

@Component({
  selector: 'app-day-menu-overview',
  templateUrl: './day-menu-overview.component.html',
  styleUrls: ['./day-menu-overview.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCol,
    IonGrid,
    IonRow,

    CommonModule]
})
export class DayMenuOverviewComponent implements OnInit {

  @Input({ required: true }) dayMenu!: IDayMenu;


  courses = Object.values(Course);
  recipeNames: { [key in Course]: string[]; } = {} as { [key in Course]: string[]; };


  get getDayName() {
    const formattedDate = new Intl.DateTimeFormat(this.translateService.currentLang, { weekday: 'long', day: 'numeric', month: 'numeric' }).format(this.dayMenu.date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  constructor(private translateService: TranslateService,
    private recipesService: RecipesService
  ) {

    addIcons({ chevronForward });

  }

  ngOnInit() {
    this.courses.forEach(async course => {
      this.recipeNames[course] = await this.getRecipesNamesForCourse(course);
    });
  }

  getMealforCourse(course: Course): string {
    const recipeNames = this.recipeNames[course];
    if (recipeNames && recipeNames.length > 0) {
      return recipeNames.join(', ');;
    }
    return this.translateService.instant('planning.day-menu-overview.no-recipe');
  }


  getCourseName(course: Course): string {
    switch (course) {
      case Course.BREAKFAST:
        return this.translateService.instant('courses.BREAKFAST');
      case Course.LUNCH:
        return this.translateService.instant('courses.LUNCH');;
      case Course.DINNER:
        return this.translateService.instant('courses.DINNER');;
      case Course.SNACK:
        return this.translateService.instant('courses.SNACK');
      case Course.MORNING_SNACK:
        return this.translateService.instant('courses.MORNING-SNACK');
      default:
        return this.translateService.instant('courses.BREAKFAST');;
    }
  }

  getRecipesNamesForCourse(course: Course): string[] {
    const meal = this.dayMenu.meals.find(meal => meal.course === course);
    let mealRecipes: string[] = [];
    if (meal === undefined) {
      return [];
    }
    meal.chosenRecipes.forEach(recipe => {
      mealRecipes.push(recipe.recipeId);
    });
    this.recipesService.getRecipesNames(mealRecipes).subscribe({
      next: (recipesNames: string[]) => {
        return recipesNames;
      },
      error: (error) => {
        console.error(error);
        return [];
      }

    });
    return [];

  }


}

