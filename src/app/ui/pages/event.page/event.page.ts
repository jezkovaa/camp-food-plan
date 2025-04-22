import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPopover, IonButton, IonIcon, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { SelectEventComponent } from '../../components/select-popover/select-event.component';
import { addIcons } from 'ionicons';
import { chevronDown, pencil } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannedEvent } from 'src/app/data/models/planned-event';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

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
    private plannedEventService: PlannedEventService,
    private router: Router,
    private loadingService: LoadingService,
  ) {

    addIcons({ pencil, chevronDown });

  }

  ngOnInit() {

    this.route.params.subscribe(async params => {
      const eventId = params['eventId'];
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.plannedEventService.getById(eventId).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
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
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
  }


  loadParticipants() {
    //todo
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
  }

  displayMenu() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['tabs/planning/events/', this.event?.id, 'menu']);
  }


  shoppingLists() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['tabs/planning/events/', this.event?.id, 'shopping-lists']);
  }

};
