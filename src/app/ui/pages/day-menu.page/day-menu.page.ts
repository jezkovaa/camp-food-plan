import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonPopover, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, calendar, chevronBack, chevronForward } from 'ionicons/icons';
import { Course } from 'src/app/data/enums/courses.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from 'src/app/data/services/planning.service';
import { IDayMeal, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ID } from 'src/app/types';
import { forkJoin, switchMap, throwError } from 'rxjs';
import { MealComponent } from '../../components/meal/meal.component';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { isAfter, isBefore } from 'date-fns';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonPopover,
    IonIcon,
    IonButton,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,

    CommonModule,
    TranslateModule,
    FormsModule,

    MealComponent]
})

export class DayMenuPage implements OnInit {

  dayMenu: IDayMenu | null = null;
  eventId: ID | null = null;
  event: IPlannedEvent | null = null;

  previousDateExists: boolean = false;
  nextDateExists: boolean = false;

  courses = Object.values(Course);


  get previousDateDisabled() {
    return !this.previousDateExists;
  }

  get getDate() {
    return this.dayMenu?.date.toISOString();
  }






  get getCurrentLang() {
    return this.translateService.currentLang;
  }

  constructor(private route: ActivatedRoute,
    private planningService: PlanningService,
    private router: Router,
    private translateService: TranslateService,
    private alertService: AlertService) {

    addIcons({ chevronBack, chevronForward, add, calendar });

  }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap(params => {
        this.eventId = params.get('eventId');
        const dayMenuId = params.get('dayMenuId');
        if (this.eventId === null) {
          return throwError(() => new Error('Event ID is null'));
        }
        if (dayMenuId === null) {
          return throwError(() => new Error('Day menu ID is null'));
        }
        return forkJoin({
          dayMenu: this.planningService.getEventMenuById(this.eventId, dayMenuId),
          event: this.planningService.getEvent(this.eventId)
        });
      })
    ).subscribe({
      next: ({ dayMenu, event }: { dayMenu: IDayMenu, event: IPlannedEvent; }) => {
        this.dayMenu = dayMenu;
        this.event = event;
        this.initDates();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  courseExists(course: Course): boolean {
    if (this.dayMenu === null) {
      return false;
    }
    return this.dayMenu.meals.some(meal => meal.course === course);
  }

  addMeal(course: Course) {
    if (this.dayMenu === null || this.eventId === null) {
      return;
    }
    this.router.navigate(['tabs/planning/events/', this.eventId, 'menu', this.dayMenu.id, course]);
  }

  // 

  getMealForCourse(course: Course): IDayMeal {
    if (this.dayMenu === null) {
      throw new Error('Day menu is null: should never happen');
    }
    const meal = this.dayMenu.meals.find(meal => meal.course === course);
    if (meal === undefined) {
      throw new Error('Meal not found: should never happen - checked before');
    }
    return meal;
  }

  getCourseName(course: Course): string {
    switch (course) {
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

  nextDate() {
    const date = this.dayMenu?.date;
    if (date === undefined) {
      return;
    }
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    this.redirectToMenu(nextDate);
  }

  previousDate() {

    const date = this.dayMenu?.date;
    if (date === undefined) {
      return;
    }
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() - 1);
    this.redirectToMenu(nextDate);
  }

  deleteMeal(mealId: ID) {
    if (this.dayMenu === null || this.eventId === null) {
      return;
    }
    this.alertService.presentConfirm(
      this.translateService.instant('planning.day-menu.alert.delete-confirm'),
      this.translateService.instant('planning.day-menu.alert.delete-confirm-message'),
      () => {
        if (this.dayMenu === null || this.eventId === null) {
          return;
        }
        this.planningService.deleteMealFromMenu(this.eventId, this.dayMenu.id, mealId).subscribe({
          next: (dayMenu: IDayMenu) => {
            this.dayMenu = dayMenu;
          },
          error: (error: any) => {
            console.error('Error deleting meal:', error);
          }
        });
      },
      () => {
        // User cancelled the deletion
      });

  }

  private redirectToMenu(date: Date) {
    if (this.eventId === null) {
      return;
    }
    this.planningService.getEventMenuForDate(this.eventId, date).subscribe({

      next: (dayMenu: IDayMenu) => {
        this.router.navigate(['tabs/planning/events', this.eventId, 'menu', dayMenu.id]);
      },
      error: (error: any) => {
        console.error(error);
      }

    });
  }

  private initDates() {
    const dayBefore = this.dayMenu?.date ? new Date(this.dayMenu.date) : null;
    dayBefore?.setDate(dayBefore.getDate() - 1);
    if (this.event?.dateFrom && dayBefore) {
      this.previousDateExists = !isBefore(dayBefore, this.event.dateFrom);
    }

    const dayAfter = this.dayMenu?.date ? new Date(this.dayMenu?.date) : null;
    dayAfter?.setDate(dayAfter.getDate() + 1);
    if (this.event?.dateTo && dayAfter) {
      this.nextDateExists = !isAfter(dayAfter, this.event.dateTo);
    }
  }
}
