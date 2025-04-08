import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRow, IonCol, IonGrid, IonButton, IonIcon } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { firstValueFrom, Observable } from 'rxjs';
import { IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { ID } from 'src/app/types';
import { PlanningService } from 'src/app/data/services/planning.service';

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

  @Input({ required: true }) dayMenu!: IDayMenu | null;
  @Input({ required: true }) eventId!: ID;
  @Input({ required: true }) date!: Date;


  courses = Object.values(Course);
  recipeNames: { [key in Course]: Array<{ id: ID, name: string; }>; } = {} as { [key in Course]: Array<{ id: ID, name: string; }>; };


  get getDayName() {
    const formattedDate = new Intl.DateTimeFormat(this.translateService.currentLang, { weekday: 'long', day: 'numeric', month: 'numeric' }).format(this.date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  constructor(private translateService: TranslateService,
    private recipesService: RecipesService,
    private router: Router,
    private planningService: PlanningService) { // Inject the PlanningService here


    addIcons({ chevronForward });
    this.loadRecipeNames = this.loadRecipeNames.bind(this);

  }

  ngOnInit() {

    this.loadRecipeNames();
  }

  getMealForCourse(course: Course): string {
    const recipeNames = this.recipeNames[course];
    if (recipeNames && recipeNames.length > 0) {
      return recipeNames.map(recipe => recipe.name).join(', ');
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
        return this.translateService.instant('courses.MORNING_SNACK');
      default:
        return this.translateService.instant('courses.BREAKFAST');;
    }
  }

  openDayMenu() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.dayMenu === null) {
      this.planningService.createDayMenu(this.eventId, this.date).subscribe({
        next: (dayMenu: IDayMenu) => {
          this.router.navigate(['/tabs/planning/events', this.eventId, "menu", dayMenu.id]);
        },
        error: (err: any) => {
          console.error('Error creating day menu', err);
        }
      });
    }
    else {
      this.router.navigate(['/tabs/planning/events', this.eventId, "menu", this.dayMenu.id]);
    }
  }

  private async loadRecipeNames() {

    this.courses.forEach(async course => {
      if (this.dayMenu === null) {
        this.recipeNames[course] = [];
        return;
      }
      const meal = this.dayMenu.meals.find(meal => meal.course === course);
      if (meal === undefined) {
        this.recipeNames[course] = [];
        return;
      }

      this.recipesService.getNames(meal.chosenRecipes).subscribe({
        next: (recipeNames: Array<{ id: ID, name: string; }>) => {
          this.recipeNames[course] = recipeNames;
        },
        error: (err: any) => {
          console.error('Error getting recipe names', err);
        }
      });
    });
  }


}

