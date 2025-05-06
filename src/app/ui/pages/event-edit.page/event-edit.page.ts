import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonTextarea, IonBackButton, IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon, IonContent, IonLabel, IonPopover, ToastController, IonDatetime, IonInput
} from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { cloneDeep, isEqual } from 'lodash';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { AlertService } from 'src/app/ui/services/alert.service';
import { CalendarComponentOptions, IonRangeCalendarComponent } from '@googlproxer/ion-range-calendar';
import { addIcons } from 'ionicons';
import { alert, close, closeCircle, save, calendar } from 'ionicons/icons';
import { PlannedEvent } from 'src/app/data/models/planned-event';
import { LoadingService } from '../../services/loading.service';
import { finalize, Observable } from 'rxjs';
import { BaseComponent } from '../../components/base-component/base.component';
import { PopoverController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-event-edit.page',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
  standalone: true,
  imports: [IonInput, IonDatetime, IonPopover, IonContent,
    IonTextarea,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,

    FormsModule,
    CommonModule,
    TranslateModule

  ]
})
export class EventEditPage extends BaseComponent implements OnInit {

  event: IPlannedEvent | null = null;
  initEvent: IPlannedEvent | null = null;
  isCreating = false;

  msg = '';

  @ViewChild('fromPicker') fromPicker!: IonDatetime;
  @ViewChild('toPicker') toPicker!: IonDatetime;

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };

  dateRange: { from: string; to: string; } = { from: '', to: '' };

  get getCurrentLang() {
    return this.translateService.currentLang;
  }

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
    private loadingService: LoadingService,
    private router: Router,
    override translateService: TranslateService,
    override toastController: ToastController,
    private popoverCtrl: PopoverController,
  ) {
    super(toastController, translateService);
    addIcons({ save, closeCircle, alert, calendar, close });

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
    this.msg += 'start saveEvent';
    if (this.isCreating && this.event) { //creating new event and nothing filled
      this.msg += "start saveEvent if";
      const loading = await this.loadingService.showLoading();
      this.msg += "start saveEvent if loading";
      await loading.present();
      this.msg += 'hihihihihi';
      this.plannedEventService.saveItem(this.event).subscribe({
        next: async (res: IPlannedEvent) => {
          this.msg += "jdkdksadjlsd";
          await loading.dismiss();
          this.msg += 'sssss';

          const toast = await this.presentSuccess(
            this.translateService.instant('alert.event-created'));
          this.msg += "toast presenting";
          await toast.present();

          //   const notification = await this.presentSuccess(this.translateService.instant('alert.event-created'));
          //  this.msg += 'hihihihihičččččč';
          //if (notification) {
          //  this.msg += this.translateService.instant('alert.event-created');
          // await notification.present();
          // this.msg += 'hahhahahaha';
          //} else {
          // this.msg += 'notification could not be created.';
          //console.error('Notification could not be created.');
          //}
          this.router.navigate(['/tabs/planning/events/', res.id]);

        },
        error: async (err: any) => {
          loading.dismiss();
          const notification = await this.presentError(err);
          await notification.present();

          console.error('Error saving event', err);
        }
      });

    }
    else if (this.event) { //saving changes
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.plannedEventService.saveItem(this.event).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
        next: async (res: IPlannedEvent) => {
          const notification = await this.presentSuccess(this.translateService.instant('alert.event-saved'));
          await notification.present();

          this.router.navigate(['/tabs/planning/events/', res.id]);
        },
        error: async (err: any) => {
          const notification = await this.presentError(err);
          await notification.present();

          console.error('Error saving event', err);
        },

      });
    }
  }

  async closeEvent() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    if (this.isAnyChange) {
      await this.unsavedChangesAlert();
    }
    else if (this.isCreating) {
      this.router.navigate(['/tabs/planning/']);
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


  async dateFromChanged(e: any) {
    await this.fromPicker.confirm(true);
    this.popoverCtrl.dismiss();
    const date = new Date(e.detail.value);
    if (this.event === null) {
      return;
    }
    this.event.dateFrom = date;
  }

  async dateToChanged(e: any) {
    await this.toPicker.confirm(true);
    this.popoverCtrl.dismiss();
    const date = new Date(e.detail.value);
    if (this.event === null) {
      return;
    }
    this.event.dateTo = date;
  }

  getISODateFrom(): string {
    if (this.event && this.event.dateFrom !== null) {
      return this.event.dateFrom.toISOString();
    }
    return '';
  }

  getISODateTo(): string {
    if (this.event && this.event.dateTo) {
      return this.event.dateTo.toISOString().substring(0, 10);
    }
    return '';
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

  private async unsavedChangesAlert(): Promise<boolean> {
    let value = false;
    const alert = await this.alertService.presentConfirmHighlight(
      this.translateService.instant('alert.unsaved-changes'),
      this.translateService.instant('alert.unsaved-changes-message'),
      () => {
        value = true;
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
    await alert.present();
    return value;
  }


}
