import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonTextarea, IonBackButton, IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon, IonContent, IonLabel, IonPopover
} from "@ionic/angular/standalone";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { cloneDeep, isEqual } from 'lodash';
import { IPlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { EventsService } from 'src/app/planning/data/services/planning.service';
import { AlertService } from 'src/app/recipes/ui/services/alert.service';
import { CalendarComponentOptions, IonRangeCalendarComponent } from '@googlproxer/ion-range-calendar';
import { addIcons } from 'ionicons';
import { closeCircle, save } from 'ionicons/icons';
import { PlannedEvent } from 'src/app/planning/data/models/planned-event';

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


  constructor(private route: ActivatedRoute,
    private planningService: EventsService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router
  ) {

    addIcons({ save, closeCircle });

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.planningService.getEvent(eventId).subscribe({
        next: (event: IPlannedEvent) => {
          this.event = cloneDeep(event);
          this.initEvent = event;
        },
        error: (err: any) => {
          this.isCreating = true;
          this.event = new PlannedEvent();
        }
      });
    });
  }


  async saveEvent() {
    const same = isEqual(this.event, this.initEvent);
    if (this.isCreating) { //creating new event and nothing filled
      if (this.event && this.validateEvent()) {
        this.planningService.saveEvent(this.event).subscribe({
          next: (res: IPlannedEvent) => {
            this.router.navigate(['/tabs/planning/events/', res.id]);
          },
          error: (err: any) => {
            console.error('Error saving event', err);
          }
        });
      }
    }
    else if (same) { // no changes
      this.alertService.presentAlert(
        this.translateService.instant('alert.no-changes'),
        this.translateService.instant('alert.no-changes-message'));
    }
    else if (this.event) { //saving changes
      this.planningService.saveEvent(this.event).subscribe({
        next: (res: IPlannedEvent) => {
          this.router.navigate(['/tabs/planning/events/', res.id]);
        },
        error: (err: any) => {
          console.error('Error saving event', err);
        }
      });
    }
  }

  async closeEvent() {

    if (this.isCreating) {
      this.alertService.presentConfirm(
        this.translateService.instant('alert.cancel-creation'),
        this.translateService.instant('alert.cancel-creation-message'),
        () => {
          this.router.navigate(['/tabs/planning/']);
        },
        () => {
        });
    }
    else if (!isEqual(this.event, this.initEvent)) {

      this.alertService.presentConfirm(
        this.translateService.instant('alert.unsaved-changes'),
        this.translateService.instant('alert.unsaved-changes-message'),
        () => {
          this.event = this.initEvent;
          if (this.event?.id) {
            this.router.navigate(['/tabs/planning/events/', this.event?.id]);
          }
          else {
            this.router.navigate(['/tabs/planning/']);
          }
        },
        () => {
          //nothing happens
        });
    }
    else {
      this.event = this.initEvent;
      this.router.navigate(['/tabs/planning/events/', this.event?.id]);
    }

  }

  dateRange(): { from: string; to: string; } {
    if (this.event?.dateFrom && this.event?.dateTo) {
      return { from: this.event.dateFrom.toDateString(), to: this.event.dateTo.toDateString() };
    }
    return { from: new Date().toDateString(), to: new Date().toDateString() };
  }

  onDidDismiss(event: any) {
    if (this.event) {
      this.event.dateFrom = event.from;
      this.event.dateTo = event.to;
      this.calendar.dismiss();
    }
  }

  private validateEvent(): boolean {

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
      this.alertService.presentAlert(messageTitle.join(', '), message.join(', '));
      return false;
    }
    return true;
  }


}
