import { Component, OnInit } from '@angular/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-detail/recipe-variant-detail.component';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VariantService } from 'src/app/data/services/variant.service';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonBackButton, IonButton, IonButtons, IonIcon, IonInfiniteScroll } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';

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
    private variantService: VariantService,
    private recipesService: RecipeService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private router: Router,
    private loadingService: LoadingService
  ) {

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
        error: (err: any) => {
          this.notificationService.presentError(err);
          loading.dismiss();
        }
      });
      const loading2 = await this.loadingService.showLoading();
      await loading2.present();
      this.recipesService.getById(recipeId).subscribe({
        next: (recipe: IRecipe | null) => {
          this.recipe = recipe;
          loading2.dismiss();
        },
        error: (err: any) => {
          this.notificationService.presentError(err);
          loading2.dismiss();
        }
      });
    });
  }


  async deleteVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('recipe-variant-detail.delete-variant'),
      this.translateService.instant('recipe-variant-detail.delete-variant-message'),
      async () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.variant === null) {
          return;
        }
        if (this.recipe && this.recipe.id && this.variant.id) {
          const loading = await this.loadingService.showLoading();
          await loading.present();
          this.variantService.deleteById(this.variant.id).subscribe({
            next: async () => {
              this.router.navigate(['/tabs/recipes', this.recipe!.id]);
              loading.dismiss();
              const toast = await this.notificationService.presentSuccess(this.translateService.instant('recipe-variant-detail.delete-variant-success'));
              await toast.present();

            },
            error: async (err: any) => {
              const toast = await this.notificationService.presentError(err);
              loading.dismiss();
              await toast.present();

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

