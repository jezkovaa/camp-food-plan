import { Component, OnInit } from '@angular/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-components/recipe-variant-detail/recipe-variant-detail.component';
import { RecipeVariant } from 'src/app/recipes/data/interfaces/recipe-variant.interface';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButton, IonButtons, IonIcon, IonInfiniteScroll } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-variant-detail.page',
  templateUrl: './recipe-variant-detail.page.component.html',
  styleUrls: ['./recipe-variant-detail.page.component.scss'],
  imports: [IonIcon, IonHeader, IonContent, IonToolbar, IonBackButton, IonButton, IonIcon, IonInfiniteScroll,
    RecipeVariantDetailComponent, CommonModule, TranslateModule],
  standalone: true
})
export class RecipeVariantDetailPage implements OnInit {


  variant: RecipeVariant | null = null;
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {

    addIcons({ trash, pencil });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      const variantId = +params['variantId'];
      this.recipesService.getVariant(recipeId, variantId).subscribe((variant: RecipeVariant) => {
        this.variant = variant;
      });
      this.recipesService.getRecipe(recipeId).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    });
  }
}

