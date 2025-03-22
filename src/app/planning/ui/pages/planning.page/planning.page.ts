import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, chevronDown } from 'ionicons/icons';
import { PlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { PlanningService } from 'src/app/planning/data/services/planning.service';
import { SelectEventComponent } from '../../components/select-popover/select-event.component';
import { PopoverController } from '@ionic/angular';

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

  plannedEvents: PlannedEvent[] = [];
  selectedEventId: string = '';

  get selectedEventText(): string {
    const selectedEvent = this.plannedEvents.find(event => event.id === this.selectedEventId);
    return selectedEvent?.name ?? 'Select Event';
  }

  @ViewChild(IonPopover) popover!: IonPopover;

  constructor(private planningService: PlanningService
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
    //todo
  }

  selectionChanged(selectedEventId: string) {
    //todo redirect to event details
    this.selectedEventId = selectedEventId;
    this.popover.dismiss();

  }
}
