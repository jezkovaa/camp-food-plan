import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonLabel, IonButton, IonButtons, IonCol, IonGrid, IonRow, IonPopover, IonSearchbar, IonBackButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/data/services/shopping-list.service';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { IShoppingList } from 'src/app/data/interfaces/shopping-list.interface';
import { ShoppingListComponent } from '../../components/shopping-list/shopping-list.component';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
  standalone: true,
  imports: [IonBackButton,
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
    private plannedEventService: PlannedEventService,
    private shoppingListService: ShoppingListService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(async (params: any) => {
      const eventId = params['eventId'];
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.plannedEventService.getById(eventId).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
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

  async getShoppingLists() {
    if (this.event === null) {
      return;

    }
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.shoppingListService.getShoppingLists(this.event.id).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: (shoppingLists: IShoppingList[]) => {
        this.shoppingLists = shoppingLists;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getPDF() {
    //todo
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
  }

  getEventDate() {
    if (this.event?.dateFrom?.getFullYear() === this.event?.dateTo?.getFullYear()) {
      return `${this.event?.dateFrom?.toLocaleDateString('default', { day: 'numeric', month: 'numeric' })} - ${this.event?.dateTo?.toLocaleDateString('default', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
    }
    return `${this.event?.dateFrom?.toLocaleDateString('default', { day: 'numeric', month: 'numeric', year: 'numeric' })} - ${this.event?.dateTo?.toLocaleDateString('default', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
  }
}
