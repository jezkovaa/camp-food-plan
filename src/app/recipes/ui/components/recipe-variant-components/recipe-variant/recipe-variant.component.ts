import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonButton } from '@ionic/angular/standalone';
import { RestrictionComponent } from '../../restriction/restriction.component';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { RecipeVariant } from 'src/app/recipes/data/interfaces/recipe-variant.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-variant',
  templateUrl: './recipe-variant.component.html',
  styleUrls: ['./recipe-variant.component.scss'],
  imports: [IonButton, TranslateModule, CommonModule, RestrictionComponent],
  standalone: true
})
export class RecipeVariantComponent {

  @Input({ required: true }) variant!: RecipeVariant;

  constructor(private router: Router) { }


  openVariant() {
    this.router.navigate(['/tabs/recipes', this.variant.recipeId, 'variants', this.variant.id]);
  }

}
