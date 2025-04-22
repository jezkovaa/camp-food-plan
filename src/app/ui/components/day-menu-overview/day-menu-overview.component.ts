import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonRow, IonCol, IonGrid, IonButton, IonIcon, IonList, IonItem, IonLabel, IonText } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { finalize, firstValueFrom, Observable } from 'rxjs';
import { IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { Course } from 'src/app/data/enums/courses.enum';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { ID } from 'src/app/types';
import { MenuService } from 'src/app/data/services/menu.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-day-menu-overview',
  templateUrl: './day-menu-overview.component.html',
  styleUrls: ['./day-menu-overview.component.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonItem, IonList,
    IonIcon,
    IonButton,
    IonGrid,

    CommonModule]
})
export class DayMenuOverviewComponent implements OnInit {

  @Input({ required: true }) dayMenu!: IDayMenu | null;
  @Input({ required: true }) eventId!: ID;
  @Input({ required: true }) date!: Date;

  @Output() navigateToDayMenuEvent = new EventEmitter<IDayMenu>();


  courses = Object.values(Course);
  recipeNames: { [key in Course]: Array<{ id: ID, name: string; }>; } = {} as { [key in Course]: Array<{ id: ID, name: string; }>; };


  get getDayName() {
    const formattedDate = new Intl.DateTimeFormat(this.translateService.currentLang, { weekday: 'long' }).format(this.date);
    const formattedDay = new Intl.DateTimeFormat(this.translateService.currentLang, { day: 'numeric', month: 'numeric' }).format(this.date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1) + '\n' + formattedDay;
  }

  constructor(private translateService: TranslateService,
    private recipesService: RecipeService,
    private loadingService: LoadingService,
    private menuService: MenuService) {


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

  async openDayMenu() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.dayMenu === null) {
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.menuService.createDayMenu(this.eventId, this.date).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
        next: (dayMenu: IDayMenu) => {
          this.navigateToDayMenuEvent.emit(dayMenu);
        },
        error: (err: any) => {
          console.error('Error creating day menu', err);
        }
      });
    }
    else {
      this.navigateToDayMenuEvent.emit(this.dayMenu);
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
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.recipesService.getNames(meal.chosenRecipes).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
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

