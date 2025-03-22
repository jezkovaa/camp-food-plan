import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPopover, IonButton, IonIcon, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { SelectEventComponent } from '../../components/select-popover/select-event.component';
import { add } from 'lodash';
import { addIcons } from 'ionicons';
import { chevronDown, pencil } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { PlannedEvent } from 'src/app/planning/data/models/planned-event';
import { IPlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { EventsService } from 'src/app/planning/data/services/planning.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonLabel, IonIcon, IonButton, IonPopover,
    IonContent,
    IonHeader,
    IonToolbar,

    CommonModule,
    FormsModule,
    SelectEventComponent,
    TranslateModule
  ],
})
export class EventPage implements OnInit {

  event: IPlannedEvent | null = null;

  constructor(private route: ActivatedRoute,
    private eventService: EventsService
  ) {

    addIcons({ pencil, chevronDown });

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const eventId = +params['id'];
      this.eventService.getEvent(eventId).subscribe({
        next: (event: IPlannedEvent) => {
          this.event = event;
        },
        error: (error: any) => {
          console.error(error);
        }
      }
      );
    });
  }

  editEvent() {
    //todo
  }


  loadParticipants() {
    //todo
  }

  displayMenu() {
    //todo
  }


  shoppingLists() {
    //todo
  }

};
