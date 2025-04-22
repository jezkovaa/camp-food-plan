import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonTextarea, IonBackButton, IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon, IonContent, IonLabel, IonPopover, IonDatetime
} from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { cloneDeep, isEqual } from 'lodash';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { AlertService } from 'src/app/ui/services/alert.service';
import { CalendarComponentOptions, IonRangeCalendarComponent } from '@googlproxer/ion-range-calendar';
import { addIcons } from 'ionicons';
import { close, closeCircle, save } from 'ionicons/icons';
import { PlannedEvent } from 'src/app/data/models/planned-event';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-event-edit.page',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
  standalone: true,
  imports: [IonPopover, IonLabel, IonContent,
    IonTextarea,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,

    FormsModule,
    CommonModule,
    TranslateModule,
    IonRangeCalendarComponent

  ]
})
export class EventEditPage implements OnInit {

  event: IPlannedEvent | null = null;
  initEvent: IPlannedEvent | null = null;
  isCreating = false;

  @ViewChild(IonPopover) calendar!: IonPopover;

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };

  dateRange: { from: string; to: string; } = { from: '', to: '' };

  get isAnyChange() {

    if (this.event && this.initEvent) {
      return !isEqual(this.event, this.initEvent);
    }
    if (this.event && !this.initEvent) {
      if (this.event.dateFrom && this.event.dateTo && this.event.name) {
        return true;
      }
      return false;
    }
    if (this.initEvent && !this.event) {
      return true;
    }
    return false;
  }

  get hasName() {
    return this.event && this.event.name && this.event.name.length > 0;
  }


  constructor(private route: ActivatedRoute,
    private plannedEventService: PlannedEventService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private router: Router
  ) {

    addIcons({ save, closeCircle, close });

  }

  ngOnInit() {

    this.route.params.subscribe(async params => {
      const eventId = params['eventId'];
      if (eventId) {
        this.isCreating = false;
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.plannedEventService.getById(eventId).subscribe({
          next: (event: IPlannedEvent) => {
            loading.dismiss();
            this.event = cloneDeep(event);
            this.initEvent = event;
          },
          error: (err: any) => {
            loading.dismiss();
            console.error('Error getting event', err);
          }
        });
      } else {
        this.isCreating = true;
        this.event = new PlannedEvent();
      }
      this.initDateRange();
    });

  }


  async saveEvent() {
    const same = isEqual(this.event, this.initEvent);
    if (this.isCreating) { //creating new event and nothing filled
      if (this.event && await this.validateEvent()) {
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.plannedEventService.saveItem(this.event).subscribe({
          next: (res: IPlannedEvent) => {
            loading.dismiss();
            this.router.navigate(['/tabs/planning/events/', res.id]);
          },
          error: (err: any) => {
            loading.dismiss();
            console.error('Error saving event', err);
          }
        });
      }
    }
    else if (same) { // no changes
      const alert = await this.alertService.presentAlert(
        this.translateService.instant('alert.no-changes'),
        this.translateService.instant('alert.no-changes-message'));
      await alert.present();

    }
    else if (this.event) { //saving changes
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.plannedEventService.saveItem(this.event).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
        next: (res: IPlannedEvent) => {
          this.router.navigate(['/tabs/planning/events/', res.id]);
        },
        error: (err: any) => {
          console.error('Error saving event', err);
        },

      });
    }
  }

  async closeEvent() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    if (this.isCreating) {
      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('alert.cancel-creation'),
        this.translateService.instant('alert.cancel-creation-message'),
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          this.router.navigate(['/tabs/planning/']);
        },
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
        });
      await alert.present();
    }
    else if (!isEqual(this.event, this.initEvent)) {

      await this.alertService.presentConfirm(
        this.translateService.instant('alert.unsaved-changes'),
        this.translateService.instant('alert.unsaved-changes-message'),
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          this.event = this.initEvent;
          if (this.event?.id) {
            this.router.navigate(['/tabs/planning/events/', this.event?.id]);
          }
          else {
            this.router.navigate(['/tabs/planning/']);
          }
        },
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          //nothing happens
        });
    }
    else {
      this.event = this.initEvent;
      this.router.navigate(['/tabs/planning/events/', this.event?.id]);
    }

  }

  initDateRange(): void {
    if (this.event?.dateFrom && this.event?.dateTo) {
      this.dateRange = { from: this.event.dateFrom.toDateString(), to: this.event.dateTo.toDateString() };
    }
  }

  onDidDismiss(event: any) {
    if (this.event) {
      this.event.dateFrom = event.from;
      this.event.dateTo = event.to;
      this.calendar.dismiss();
    }
  }

  clearDateRange() {
    if (this.event) {
      this.event.dateFrom = null;
      this.event.dateTo = null;
      this.dateRange = { from: '', to: '' };
    }
  }

  private async validateEvent(): Promise<boolean> {

    let message: string[] = [];
    let messageTitle: string[] = [];

    if (!this.event?.name) {
      messageTitle.push(this.translateService.instant('alert.missing-name'));
      message.push(this.translateService.instant('alert.missing-name-message'));
    }
    if (!this.event?.dateFrom || !this.event?.dateTo) {
      messageTitle.push(this.translateService.instant('alert.missing-dates'),);
      message.push(this.translateService.instant('alert.missing-dates-message'));
    }

    if (message.length > 0) {
      const alert = await this.alertService.presentAlert(messageTitle.join(', '), message.join(', '));
      await alert.present();
      return false;
    }
    return true;
  }


}
