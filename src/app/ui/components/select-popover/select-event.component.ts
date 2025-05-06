import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { IonToolbar, IonItem, IonList, IonSearchbar, IonButton } from "@ionic/angular/standalone";
import { LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-event',
  templateUrl: './select-event.component.html',
  styleUrls: ['./select-event.component.css'],
  standalone: true,
  imports: [IonButton,
    IonItem,
    IonToolbar,
    IonList,
    IonSearchbar,

    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class SelectEventComponent implements OnInit {



  @Output() selectionChange = new EventEmitter<string>();

  filteredItems: IPlannedEvent[] = [];
  items: IPlannedEvent[] = [];

  constructor(private plannedEventService: PlannedEventService,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService
  ) {

  }

  async ngOnInit() {
    this.filteredItems = [...this.items];
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('loading'),
    });
    loading.present();
    this.plannedEventService.getAll().subscribe({
      next: (plannedEvents: IPlannedEvent[]) => {
        this.items = plannedEvents;
        loading.dismiss();
        this.filteredItems = [...this.items];
      },
      error: (error) => {
        console.error(error);
        loading.dismiss();
      }
    });
  }


  selectItem(item: IPlannedEvent) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.selectionChange.emit(item.id);
  }

  searchbarInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterList(inputElement.value);
  }

  filterList(searchQuery: string | undefined) {

    if (searchQuery === undefined || searchQuery.trim() === '') {
      this.filteredItems = [...this.items];
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
    }
  }

}