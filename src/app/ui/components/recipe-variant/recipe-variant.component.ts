import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonButton, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { RestrictionComponent } from '../restriction/restriction.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { Router } from '@angular/router';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';

@Component({
  selector: 'app-recipe-variant',
  templateUrl: './recipe-variant.component.html',
  styleUrls: ['./recipe-variant.component.scss'],
  imports: [IonCheckbox, IonButton, TranslateModule, CommonModule, RestrictionComponent],
  standalone: true
})
export class RecipeVariantComponent {

  @Input({ required: true }) variant!: IRecipeVariant;
  @Input() isEditing = false;
  @Input() isChoosing = false;
  @Output() selectionChanged = new EventEmitter<{ id: string, selected: boolean; }>();


  get existingVariantsRestrictions() {

    return this.variant.restrictions.length > 0 || !(this.variant.restrictions.length === 1 && this.variant.restrictions[0] === FoodRestriction.NONE);

  }

  constructor(private router: Router) { }


  openVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['/tabs/recipes', this.variant.recipeId, 'variants', this.variant.id]);
  }

  checkboxClick(event: Event) {
    if (this.variant.id === null) {
      console.error('Variant ID is null. Cannot emit selection change.');
      return;
    }
    this.selectionChanged.emit({ id: this.variant.id, selected: (event.target as HTMLIonCheckboxElement).checked });
  }

}
