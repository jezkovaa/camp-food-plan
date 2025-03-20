import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { RestrictionComponent } from "../../restriction/restriction.component";
import { IonItem, IonButton, IonIcon } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, RestrictionComponent, TranslateModule]
})
export class RecipeComponent {

  @Input({ required: true }) recipe!: IRecipe;
  @Input() isEditing = false;

  constructor(private router: Router) { }

  openRecipe() {
    this.router.navigate(['/tabs/recipes', this.recipe.id]);
  }

}
