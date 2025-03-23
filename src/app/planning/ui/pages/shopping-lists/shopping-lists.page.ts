import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonIcon, IonButtons, IonCol, IonGrid, IonRow, IonPopover, IonSearchbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/planning/data/services/planning.service';
import { IPlannedEvent } from 'src/app/planning/data/interfaces/planned-event.interface';
import { IShoppingList } from 'src/app/planning/data/interfaces/shopping-list.interface';
import { ShoppingListComponent } from '../../components/shopping-list/shopping-list.component';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonGrid,
    IonCol,
    IonButtons,
    IonButton,
    IonLabel,
    IonContent,
    IonHeader,
    IonToolbar,

    CommonModule,
    TranslateModule,
    FormsModule,

    ShoppingListComponent]
})
export class ShoppingListsPage implements OnInit {

  event: IPlannedEvent | null = null;
  shoppingLists: IShoppingList[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      const eventId = +params['eventId'];
      this.eventService.getEvent(eventId).subscribe({
        next: (event: IPlannedEvent) => {
          this.event = event;
          this.getShoppingLists();
        },
        error: (error: any) => {
          console.error(error);
        }
      }
      );
    });
  }

  getShoppingLists() {
    if (this.event === null) {
      return;
    } this.eventService.getShoppingLists(this.event.id).subscribe({
      next: (shoppingLists) => {
        this.shoppingLists = shoppingLists;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getPDF() {
    //todo
  }
}
