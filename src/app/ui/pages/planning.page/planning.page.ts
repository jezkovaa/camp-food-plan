import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonIcon, IonPopover, IonButtons, IonBackButton, IonSearchbar, IonList, IonItem, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, chevronDown } from 'ionicons/icons';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { SelectEventComponent } from '../../components/select-popover/select-event.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { cloneDeep } from 'lodash';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-planning',
  templateUrl: 'planning.page.html',
  styleUrls: ['planning.page.scss'],
  imports: [IonFabButton, IonFab, IonItem, IonList, IonSearchbar,
    IonButton,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    CommonModule,
    TranslateModule
  ],
  providers: [PopoverController]
})
export class PlanningPage implements OnInit, ViewWillEnter {

  plannedEvents: IPlannedEvent[] = [];
  filteredItems: IPlannedEvent[] = [];
  selectedEventId: string = '';


  @ViewChild(IonPopover) popover!: IonPopover;

  constructor(private plannedEventService: PlannedEventService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    addIcons({ add, chevronDown });
  }

  async ngOnInit() {
    this.init();
  }


  async ionViewWillEnter() {
    this.init();
  }

  async init() {
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.plannedEventService.getAll().pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: (plannedEvents: IPlannedEvent[]) => {
        this.plannedEvents = plannedEvents;
        this.filteredItems = cloneDeep(plannedEvents);
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
    this.router.navigate(['tabs/planning/events/', selectedEventId]);

  }

  selectItem(item: IPlannedEvent) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.selectionChanged(item.id);
  }

  searchbarInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterList(inputElement.value);
  }

  filterList(searchQuery: string | undefined) {

    if (searchQuery === undefined || searchQuery.trim() === '') {
      this.filteredItems = [...this.plannedEvents];
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.plannedEvents.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
    }
  }
}
