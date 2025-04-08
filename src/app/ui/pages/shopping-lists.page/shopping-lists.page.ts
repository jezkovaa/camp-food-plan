import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonCol, IonGrid, IonRow, IonPopover, IonSearchbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { PlanningService } from 'src/app/data/services/planning.service';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { IShoppingList } from 'src/app/data/interfaces/shopping-list.interface';
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
    private planningService: PlanningService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      const eventId = params['eventId'];
      this.planningService.getEvent(eventId).subscribe({
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
    } this.planningService.getShoppingLists(this.event.id).subscribe({
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
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
  }
}
