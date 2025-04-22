import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RestrictionComponent } from "../restriction/restriction.component";
import { IonItem, IonButton, IonIcon, IonCheckbox } from "@ionic/angular/standalone";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ID } from 'src/app/types';
import { addIcons } from 'ionicons';
import { alert } from 'ionicons/icons';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonButton,
    IonIcon,

    CommonModule, RestrictionComponent, TranslateModule]
})
export class RecipeComponent implements OnInit {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;
  @Input() isChoosing = false;
  @Input() isSelected = false;

  @Output() selectionChangedEvent = new EventEmitter<{ recipeId: ID, selected: boolean; }>();

  @Output() navigateToRecipeEvent = new EventEmitter<ID>();

  get existingVariantsRestrictions() {
    let existingRestriction = false;
    this.recipe.variants.forEach(variant => {
      if (variant.restrictions.size > 0) {
        existingRestriction = true;
        return;
      }
    });
    return existingRestriction;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) {
    addIcons({ alert });
  }

  ngOnInit() {

  }

  selectionChanged(event: Event) {
    if (this.recipe.id === null) {
      console.error('Recipe ID is null. Cannot emit selectionChangedEvent.');
      return;
    }
    this.selectionChangedEvent.emit({
      recipeId: this.recipe.id,
      selected: (event.target as HTMLInputElement).checked
    });
  }

  openRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe.id === null) {
      console.error('Recipe ID is null. Cannot emit navigateToRecipeEvent.');
      return;
    }
    this.navigateToRecipeEvent.emit(this.recipe.id);
  }

}
