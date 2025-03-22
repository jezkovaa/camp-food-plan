import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { IonToolbar, IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonButton, IonCheckbox } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    FormsModule
  ]
})
export class SelectEventComponent implements OnInit {

  @Input() items: PlannedEvent[] = [];
  @Input() selectedItems: string = "";
  @Input() title = 'Select Items';

  @Output() selectionChange = new EventEmitter<string>();

  filteredItems: PlannedEvent[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }


  selectItem(item: PlannedEvent) {
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