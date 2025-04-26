import { Component, Input, OnInit } from '@angular/core';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { IonList, IonReorder, IonReorderGroup, IonItem, IonLabel, IonTitle, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronDown, chevronUp } from 'ionicons/icons';
import { RestrictionComponent } from '../restriction/restriction.component';

@Component({
  selector: 'app-recipe-variant-detail',
  templateUrl: './recipe-variant-detail.component.html',
  styleUrls: ['./recipe-variant-detail.component.scss'],
  imports: [IonIcon, IonButton, IonRow, IonCol, IonGrid, IonList, IonReorderGroup, IonReorder, IonItem, IonLabel,
    TranslateModule, CommonModule, RestrictionComponent
  ],
  standalone: true
})
export class RecipeVariantDetailComponent implements OnInit {

  @Input({ required: true }) variant!: IRecipeVariant;

  proceedingVisible = true;
  ingredientsVisible = true;
  changesVisible = true;

  isEditing = true;

  constructor() {
    addIcons({ chevronDown, chevronUp });
  }

  ngOnInit() { }

  getIcon(partVisible: boolean) {
    return partVisible ? 'chevron-up' : 'chevron-down';

  }

  toggleProceeding() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.proceedingVisible = !this.proceedingVisible;
  }

  toggleIngredients() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.ingredientsVisible = !this.ingredientsVisible;
  }

  toggleChanges() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.changesVisible = !this.changesVisible;
  }

  handleReorder(event: any) {
    //todo
    // when the drag started and ended, respectively
    //console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }


}
