import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonButton, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { RestrictionComponent } from '../restriction/restriction.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { Router } from '@angular/router';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { ID } from 'src/app/types';
import { MultipleRestrictionsComponent } from "../multiple-restrictions/multiple-restrictions.component";

@Component({
  selector: 'app-recipe-variant',
  templateUrl: './recipe-variant.component.html',
  styleUrls: ['./recipe-variant.component.scss'],
  imports: [IonCheckbox, IonButton, TranslateModule, CommonModule, MultipleRestrictionsComponent],
  standalone: true
})
export class RecipeVariantComponent implements OnInit {

  @Input({ required: true }) variant!: IRecipeVariant;
  @Input() isEditing = false;
  @Input() isChoosing = false;
  @Input() isSelected = false;
  @Output() selectionChanged = new EventEmitter<{ id: string, selected: boolean; }>();
  @Output() openVariantEvent = new EventEmitter<ID>();

  get existingVariantsRestrictions() {

    return !(this.variant.restrictions.size === 0 || (this.variant.restrictions.size === 1 && this.variant.restrictions.has(FoodRestriction.NONE)));

  }

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.isSelected && this.variant.id !== null) {
      this.selectionChanged.emit({ id: this.variant.id, selected: true });
    }
  }

  openVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.variant.id === null) {
      console.error('Variant ID is null. Cannot navigate to variant.');
      return;
    }
    this.openVariantEvent.emit(this.variant.id);

  }

  checkboxClick(event: Event) {
    if (this.variant.id === null) {
      console.error('Variant ID is null. Cannot emit selection change.');
      return;
    }
    this.selectionChanged.emit({ id: this.variant.id, selected: (event.target as HTMLIonCheckboxElement).checked });
  }

}
