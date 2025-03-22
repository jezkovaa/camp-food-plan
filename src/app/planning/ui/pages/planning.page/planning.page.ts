import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { PlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { PlanningService } from 'src/app/planning/data/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: 'planning.page.html',
  styleUrls: ['planning.page.scss'],
  imports: [
    IonButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,

    CommonModule,
    TranslateModule]
})
export class PlanningPage implements OnInit {

  plannedEvents: PlannedEvent[] = [];

  constructor(private planningService: PlanningService) {
    addIcons({ add });
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
}
