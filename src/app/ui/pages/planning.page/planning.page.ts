import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, chevronDown } from 'ionicons/icons';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { PlanningService } from 'src/app/data/services/planning.service';
import { SelectEventComponent } from '../../components/select-popover/select-event.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: 'planning.page.html',
  styleUrls: ['planning.page.scss'],
  imports: [IonPopover,
    IonButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    CommonModule,
    TranslateModule,
    SelectEventComponent
  ],
  providers: [PopoverController]
})
export class PlanningPage implements OnInit {

  plannedEvents: IPlannedEvent[] = [];
  selectedEventId: string = '';

  get selectedEventText(): string {
    const selectedEvent = this.plannedEvents.find(event => event.id === this.selectedEventId);
    return selectedEvent?.name ?? this.translateService.instant("planning.event.select-event");
  }

  @ViewChild(IonPopover) popover!: IonPopover;

  constructor(private planningService: PlanningService,
    private translateService: TranslateService,
    private router: Router
  ) {
    addIcons({ add, chevronDown });
  }

  ngOnInit() {
    this.planningService.getPlannedEvents().subscribe({
      next: (plannedEvents) => {
        this.plannedEvents = plannedEvents;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createEvent() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['tabs/planning/events/new']);
  }

  selectionChanged(selectedEventId: string) {
    this.selectedEventId = selectedEventId;
    this.popover.dismiss();
    this.router.navigate(['tabs/planning/events/', selectedEventId]);

  }
}
