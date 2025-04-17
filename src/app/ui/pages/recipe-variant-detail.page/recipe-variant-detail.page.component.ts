import { Component, OnInit } from '@angular/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-detail/recipe-variant-detail.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButton, IonButtons, IonIcon, IonInfiniteScroll } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
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
      const recipeId = params['recipeId'];
      const variantId = params['variantId'];
      this.recipesService.getVariant(recipeId, variantId).subscribe((variant: IRecipeVariant | null) => {
        this.variant = variant;
      });
      this.recipesService.getRecipe(recipeId).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
      });
    });
  }


  async deleteVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('recipe-variant-detail.delete-variant'),
      this.translateService.instant('recipe-variant-detail.delete-variant-message'),
      () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.variant === null) {
          return;
        }
        if (this.recipe && this.recipe.id) {
          this.recipesService.deleteVariant(this.recipe!.id, this.variant.id).subscribe({
            next: async () => {
              this.router.navigate(['/tabs/recipes', this.recipe!.id]);
              const alert = await this.alertService.deleteSuccess();
              await alert.present();

            },
            error: async (err: any) => {
              const alert = await this.alertService.deleteError(err);
              await alert.present();

            }
          });
        }
      }
    );
    await alert.present();
  }

  editVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.variant === null) {
      return;
    }
    this.router.navigate(['/tabs/recipes', this.recipe!.id, 'variants', this.variant.id, 'edit']);
  }
}

