import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../../data/services/recipes.service';
import { IonTitle, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonBackButton, IonItem, IonLabel, IonListHeader, IonList, IonImg } from '@ionic/angular/standalone';
import { Recipe } from '../../../data/interfaces/recipe.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { RecipesPage } from '../recipes.page/recipes.page';
import { RecipeDetailComponent } from '../../components/recipe-components/recipe-detail/recipe-detail.component';


@Component({
  selector: 'app-recipe.page',
  templateUrl: './recipe-detail.page.component.html',
  styleUrls: ['./recipe-detail.page.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackButton,
    CommonModule, TranslateModule,
    RecipeDetailComponent],
  standalone: true,
  providers: [TranslateService, TranslateStore]
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe | null = null;
  component = RecipesPage;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,

  ) {

    addIcons({ pencil, trash });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      this.recipesService.getRecipe(recipeId).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    });
  }



}
