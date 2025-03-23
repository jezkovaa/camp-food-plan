import { Component, Input, OnInit } from '@angular/core';
import { IShoppingList } from 'src/app/planning/data/interfaces/shopping-list.interface';
import { IonLabel, IonRow, IonGrid, IonCol, IonButton, IonIcon } from "@ionic/angular/standalone";
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCol, IonGrid, IonRow, IonLabel,
    TranslateModule,
    CommonModule
  ],
  providers: [DatePipe]
})
export class ShoppingListComponent implements OnInit {

  @Input({ required: true }) list!: IShoppingList;

  constructor() {
    addIcons({ chevronForward });
  }

  ngOnInit() { }

  openList() {
    //todd
  }

}
