import { Component, OnInit } from '@angular/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-components/recipe-variant-detail/recipe-variant-detail.component';
import { IRecipeVariant } from 'src/app/recipes/data/interfaces/recipe-variant.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButton, IonButtons, IonIcon, IonInfiniteScroll } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { IRecipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-recipe-variant-detail.page',
  templateUrl: './recipe-variant-detail.page.component.html',
  styleUrls: ['./recipe-variant-detail.page.component.scss'],
  imports: [IonIcon,
    IonHeader,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonButton,
    IonButtons,
    RecipeVariantDetailComponent,
    CommonModule,
    TranslateModule],
  standalone: true
})
export class RecipeVariantDetailPage implements OnInit {


  variant: IRecipeVariant | null = null;
  recipe: IRecipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private router: Router
  ) {

    addIcons({ trash, pencil });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      const variantId = +params['variantId'];
      this.recipesService.getVariant(recipeId, variantId).subscribe((variant: IRecipeVariant) => {
        this.variant = variant;
      });
      this.recipesService.getRecipe(recipeId).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
      });
    });
  }


  async deleteVariant() {
    this.alertService.presentConfirm(
      this.translateService.instant('recipe-variant-detail.delete-variant'),
      this.translateService.instant('recipe-variant-detail.delete-variant-message'),
      () => {
        if (this.variant === null) {
          return;
        }
        if (this.recipe && this.recipe.id) {
          this.recipesService.deleteVariant(this.recipe!.id, this.variant.id).subscribe({
            next: async () => {
              this.router.navigate(['/tabs/recipes', this.recipe!.id]);
              this.alertService.deleteSuccess();

            },
            error: async (err: any) => {
              this.alertService.deleteError(err);

            }
          });
        }
      }
    );
  }
}

