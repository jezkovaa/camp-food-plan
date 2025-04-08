import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RestrictionComponent } from "../restriction/restriction.component";
import { IonItem, IonButton, IonIcon } from "@ionic/angular/standalone";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, RestrictionComponent, TranslateModule]
})
export class RecipeComponent implements OnInit {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;
  @Input() isChoosing = false;

  get existingVariantsRestrictions() {
    let existingRestriction = false;
    this.recipe.variants.forEach(variant => {
      if (variant.restrictions.length > 0) {
        existingRestriction = true;
        return;
      }
    });
    return existingRestriction;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

  }

  openRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.isChoosing) {

      this.router.navigate(['./recipe', this.recipe.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/tabs/recipes', this.recipe.id]);
    }
  }

}
