import { Component, Input, OnInit } from '@angular/core';
import { IRecipeVariant } from 'src/app/recipes/data/interfaces/recipe-variant.interface';
import { IonList, IonReorder, IonReorderGroup, IonItem, IonLabel, IonTitle, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-variant-detail',
  templateUrl: './recipe-variant-detail.component.html',
  styleUrls: ['./recipe-variant-detail.component.scss'],
  imports: [IonRow, IonCol, IonGrid, IonList, IonReorderGroup, IonReorder, IonItem, IonLabel,
    TranslateModule, CommonModule
  ],
  standalone: true
})
export class RecipeVariantDetailComponent implements OnInit {

  @Input({ required: true }) variant!: IRecipeVariant;


  isEditing = true;

  constructor() { }

  ngOnInit() { }

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
