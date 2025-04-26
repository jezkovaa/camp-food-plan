import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonPopover, IonDatetime, IonDatetimeButton, IonModal, AlertController, IonList, IonItem } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, calendar, chevronBack, chevronForward } from 'ionicons/icons';
import { Course } from 'src/app/data/enums/courses.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/data/services/menu.service';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { IDayMeal, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ID } from 'src/app/types';
import { finalize, forkJoin, switchMap, throwError } from 'rxjs';
import { MealComponent } from '../../components/meal/meal.component';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { isAfter, isBefore } from 'date-fns';
import { AlertService } from '../../services/alert.service';
import { LoadingService } from '../../services/loading.service';
import { ToastController } from '@ionic/angular';
import { BaseComponent } from '../../components/base-component/base.component';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.page.html',
  styleUrls: ['./day-menu.page.scss'],
  standalone: true,
  imports: [IonItem, IonList,
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

export class DayMenuPage extends BaseComponent implements OnInit {

  @ViewChild('datepicker') datepicker!: IonDatetime;

  dayMenu: IDayMenu | null = null;
  eventId: ID | null = null;
  event: IPlannedEvent | null = null;

  highlightedDates: Array<{ date: string, textColor: string, backgroundColor: string; }> = [];


  previousDateExists: boolean = false;
  nextDateExists: boolean = false;

  courses = Object.values(Course);


  get previousDateDisabled() {
    return !this.previousDateExists;
  }

  get getDate() {
    return this.dayMenu?.date.toISOString();
  }

  get getDateFromISOString() {
    return this.event?.dateFrom ? this.event?.dateFrom?.toISOString() : new Date().toISOString();
  }

  get getDateToISOString() {
    return this.event?.dateTo ? this.event?.dateTo?.toISOString() : new Date().toISOString();

  }

  get getCurrentLang() {
    return this.translateService.currentLang;
  }

  constructor(private route: ActivatedRoute,
    private menuService: MenuService,
    private plannedEventService: PlannedEventService,
    private router: Router,
    override translateService: TranslateService,
    private loadingService: LoadingService,
    override toastController: ToastController,
    private alertController: AlertController) {

    super(toastController, translateService);

    addIcons({ chevronBack, chevronForward, add, calendar });

  }

  ngOnInit() {
    this.init();

  }

  ngOnChanges() {
    this.init();
  }

  courseExists(course: Course): boolean {
    if (this.dayMenu === null) {
      return false;
    }
    return this.dayMenu.meals.some(meal => meal.course === course);
  }

  addMeal(course: Course) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.dayMenu === null || this.eventId === null) {
      return;
    }
    this.router.navigate(['tabs/planning/events/', this.eventId, 'menu', this.dayMenu.id, course, 'recipes']);
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
        return this.translateService.instant('courses.MORNING_SNACK');
      default:
        return '';

    }

  }

  nextDate() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const date = this.dayMenu?.date;
    if (date === undefined) {
      return;
    }
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    this.redirectToMenu(nextDate);
  }

  previousDate() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const date = this.dayMenu?.date;
    if (date === undefined) {
      return;
    }
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() - 1);
    this.redirectToMenu(nextDate);
  }

  async deleteMeal(mealId: ID) {
    if (this.dayMenu === null || this.eventId === null) {
      return;
    }

    const alert = await this.alertController.create({
      header: this.translateService.instant('planning.day-menu.alert.delete-confirm'),
      message: this.translateService.instant('planning.day-menu.alert.delete-confirm-message'),
      buttons: [
        {
          text: this.translateService.instant('alert.cancel'),
          role: 'cancel',
          handler: () => {
            const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
            buttonElement.blur();
            // User cancelled the deletion
          }
        },
        {
          text: 'OK',
          handler: async () => {
            const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
            buttonElement.blur();
            if (this.dayMenu === null || this.eventId === null) {
              return;
            }
            const loading = await this.loadingService.showLoading();
            await loading.present();
            this.menuService.deleteMealFromMenu(this.eventId, this.dayMenu.id, mealId).pipe(
              finalize(() => loading.dismiss())
            ).subscribe({
              next: async (dayMenu: IDayMenu) => {
                this.dayMenu = dayMenu;
                const notification = await this.presentSuccess(
                  this.translateService.instant('planning.day-menu.alert.delete-success')
                );
                await notification.present();
              },
              error: async (error: any) => {
                const notification = await this.presentError(
                  this.translateService.instant('planning.day-menu.alert.error-title')
                );
                await notification.present();

              }
            });
          },
        }
      ]
    });
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    await alert.present();
    let result = await alert.onDidDismiss();


    /*await this.alertService.presentConfirm(
      this.translateService.instant('planning.day-menu.alert.delete-confirm'),
      this.translateService.instant('planning.day-menu.alert.delete-confirm-message'),
      () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.dayMenu === null || this.eventId === null) {
          return;
        }
        this.planningService.deleteMealFromMenu(this.eventId, this.dayMenu.id, mealId).subscribe({
          next: (dayMenu: IDayMenu) => {
            this.dayMenu = dayMenu;
          },
          error: async (error: any) => {
            await this.alertService.presentAlert(
              this.translateService.instant('planning.day-menu.alert.error-title'),
              this.translateService.instant('planning.day-menu.alert.error-message')
            );
          }
        });
      },
      () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        // User cancelled the deletion
      });*/
  }

  editMeal(mealId: ID) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.dayMenu === null || this.eventId === null) {
      return;
    }
    this.router.navigate(['tabs/planning/events/', this.eventId, 'menu', this.dayMenu.id, 'meal', mealId]);
  }



  async dateChanged(e: any) {
    await this.datepicker.confirm(true);
    const date = e.detail.value;

    if (this.eventId === null) {
      return;
    }
    if (this.event?.dateFrom && this.event.dateTo && (isBefore(this.event?.dateFrom, date) || isAfter(this.event?.dateTo, date))) {
      return; //date is not in range
    }

    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.menuService.getEventMenuForDate(this.eventId, date).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({

      next: (dayMenu: IDayMenu) => {
        this.router.navigate(['tabs/planning/events', this.eventId, 'menu', dayMenu.id]);
      },
      error: (error: any) => {
        console.error(error);
      }

    });
  }

  private init() {
    this.route.paramMap.pipe(
      switchMap(async params => {
        this.eventId = params.get('eventId');
        const dayMenuId = params.get('dayMenuId');
        if (this.eventId === null) {
          return throwError(() => new Error('Event ID is null'));
        }
        if (dayMenuId === null) {
          return throwError(() => new Error('Day menu ID is null'));
        }
        const loading = await this.loadingService.showLoading();
        await loading.present();

        return forkJoin({
          dayMenu: this.menuService.getEventMenuById(this.eventId, dayMenuId),
          event: this.plannedEventService.getById(this.eventId)
        }).pipe(
          finalize(() => loading.dismiss())
        );
      }),
      switchMap(result => result) // Unwrap the observable
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

  private async redirectToMenu(date: Date) {
    if (this.eventId === null) {
      return;
    }
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.menuService.getEventMenuForDate(this.eventId, date).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({

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

    if (this.event?.dateFrom && this.event?.dateTo) {
      const startDate = new Date(this.event.dateFrom);
      const endDate = new Date(this.event.dateTo);
      this.highlightedDates = [];

      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        this.highlightedDates.push({
          date: date.toISOString().split('T')[0], // Format to yyyy-MM-dd
          textColor: 'black',
          backgroundColor: 'var(--ion-color-tertiary)'
        });
      }
    }

  }
}
