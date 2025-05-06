import { Component, OnInit } from '@angular/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-detail/recipe-variant-detail.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VariantService } from 'src/app/data/services/variant.service';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButton, IonButtons, IonIcon, IonInfiniteScroll, IonText, IonItem, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../../services/loading.service';
import { BaseComponent } from '../../components/base-component/base.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-variant-detail.page',
  templateUrl: './recipe-variant-detail.page.component.html',
  styleUrls: ['./recipe-variant-detail.page.component.scss'],
  imports: [IonLabel, IonItem, IonText, IonIcon,
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
export class RecipeVariantDetailPage extends BaseComponent implements OnInit {


  variant: IRecipeVariant | null = null;
  recipe: IRecipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private variantService: VariantService,
    private recipesService: RecipeService,
    override translateService: TranslateService,
    private alertService: AlertService,
    override toastController: ToastController,
    private router: Router,
    private loadingService: LoadingService
  ) {

    super(toastController, translateService);
    addIcons({ trash, pencil });

  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const recipeId = params['recipeId'];
      const variantId = params['variantId'];
      const loading = await this.loadingService.showLoading();
      await loading.present();;
      this.variantService.getById(variantId).subscribe({
        next: (variant: IRecipeVariant | null) => {
          this.variant = variant;
          loading.dismiss();
        },
        error: async (err: any) => {
          loading.dismiss();

          const notification = await this.presentError(err);
          await notification.present();

        }
      });
      const loading2 = await this.loadingService.showLoading();
      await loading2.present();
      this.recipesService.getById(recipeId).subscribe({
        next: (recipe: IRecipe | null) => {
          this.recipe = recipe;
          loading2.dismiss();
        },
        error: async (err: any) => {
          loading2.dismiss();

          const notification = await this.presentError(err);
          await notification.present();

        }
      });
    });
  }


  async deleteVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('recipes.recipe-variant-detail.delete-variant'),
      this.translateService.instant('recipes.recipe-variant-detail.delete-variant-message'),
      async () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.variant === null) {
          return;
        }
        if (this.recipe && this.recipe.id && this.variant.id) {
          const loading = await this.loadingService.showLoading();
          await loading.present();
          this.variantService.deleteById(this.variant.id).pipe(
            finalize(() => loading.dismiss())
          ).subscribe({
            next: async () => {
              loading.dismiss();
              // const notification = await this.presentSuccess(this.translateService.instant('recipe-variant-detail.delete-variant-success'));
              // await notification.present();
              if (this.recipe) {
                this.router.navigate(['/tabs/recipes', this.recipe.id]);
              }
              else {
                this.router.navigate(['/tabs/recipes']);
              }


            },
            error: async (err: any) => {
              const notification = await this.presentError(err);
              loading.dismiss();
              await notification.present();

            }
          });
        }
      }
    );
    await alert.present();
  }

  goToRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe === null) {
      return;
    }
    this.router.navigate(['/tabs/recipes', this.recipe!.id]);
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

