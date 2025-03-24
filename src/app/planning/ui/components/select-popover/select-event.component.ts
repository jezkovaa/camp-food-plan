import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { IonToolbar, IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonButton, IonCheckbox } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from 'src/app/planning/data/services/planning.service';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(private eventService: EventsService) {

  }

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.eventService.getPlannedEvents().subscribe({
      next: (plannedEvents) => {
        this.items = plannedEvents;
        this.filteredItems = [...this.items];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  selectItem(item: IPlannedEvent) {
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