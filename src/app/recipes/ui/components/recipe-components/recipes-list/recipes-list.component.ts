import { Component, OnInit } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { RecipeComponent } from '../recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  imports: [IonList, RecipeComponent, CommonModule],
  standalone: true
})
export class RecipesListComponent {

  @Input({ required: true }) recipes: Recipe[] = [];

  constructor() { }


}
