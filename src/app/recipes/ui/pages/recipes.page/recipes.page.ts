import { Component, OnInit } from '@angular/core';
import { IonHeader, IonSearchbar, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { RecipesListComponent } from '../../components/recipe-components/recipes-list/recipes-list.component';

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  imports: [IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonSearchbar,
    TranslateModule,
    CommonModule,
    RecipesListComponent],
  standalone: true,
  providers: [TranslateService, TranslateStore]
})
export class RecipesPage implements OnInit {

  recipes: Recipe[] = [];


  constructor(private recipesService: RecipesService) {
    addIcons({ add });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipesService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}
