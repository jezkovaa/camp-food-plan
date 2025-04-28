import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTextarea } from '@ionic/angular/standalone';
import { ID } from 'src/app/types';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { VariantService } from 'src/app/data/services/variant.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-detail/recipe-variant-detail.component';
import { VariantEditComponent } from '../../components/variant-edit/variant-edit.component';
import { addIcons } from 'ionicons';
import { alert, closeCircle, save } from 'ionicons/icons';
import { RecipeVariant } from 'src/app/data/models/recipe-variant';
import { cloneDeep, isEqual } from 'lodash';
import { AlertService } from '../../services/alert.service';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { LoadingService } from '../../services/loading.service';
import { ToastController } from '@ionic/angular';
import { BaseComponent } from '../../components/base-component/base.component';

@Component({
  selector: 'app-variant-edit-page',
  templateUrl: './variant-edit.page.html',
  styleUrls: ['./variant-edit.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTextarea,

    CommonModule,
    FormsModule,
    TranslateModule,

    VariantEditComponent
  ],
})
export class VariantEditPage extends BaseComponent implements OnInit {

  @ViewChild('variantEditCmp') variantEditComponent!: VariantEditComponent;

  recipeId: ID | null = null;
  variantId: ID | null = null;

  variant: IRecipeVariant | null = null;
  initName = '';
  isCreating = false;

  msg = "";

  isCreatingRecipe = false;
  newRecipeData: IRecipe | null = null;

  get isAnyChange() {
    return this.variant && this.variantEditComponent && (this.variantEditComponent.isIngredientsValidAndChanged() || this.variantEditComponent.isProceedingValidAndChanged() || !isEqual(this.variantEditComponent.foodRestrictions, this.variant.restrictions) || this.initName !== this.variant.name);
  }

  get hasName() {
    return this.variant && this.variant.name && this.variant.name.length > 0;
  }

  constructor(private route: ActivatedRoute,
    private variantService: VariantService,
    private alertService: AlertService,
    override translateService: TranslateService,
    private loadingService: LoadingService,
    override toastController: ToastController,
    private router: Router) {
    super(toastController, translateService);
    addIcons({ save, closeCircle, alert });
  }

  ngOnInit() {

    this.route.params.subscribe(async params => {
      this.recipeId = params['recipeId'];
      this.variantId = params['variantId'];
      if (!this.recipeId) {
        //should not happen
        console.error('Recipe ID or Variant ID is missing in the route parameters.');
        return;
      }
      else if (this.recipeId === 'new') {
        this.isCreatingRecipe = true;
        this.recipeId = null;
        this.isCreating = true;
        this.variant = new RecipeVariant(this.recipeId);
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
          this.newRecipeData = state['recipeData'] || null;
        }
      }
      if (this.recipeId && !this.variantId) {
        this.isCreating = true;
        let createdFromId: ID | null = null;
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
          createdFromId = state['variantId'] || null;
        }
        if (createdFromId) {
          const loading = await this.loadingService.showLoading();
          await loading.present();
          this.variantService.getById(createdFromId).subscribe({
            next: (variant: IRecipeVariant | null) => {
              loading.dismiss();
              this.variant = cloneDeep(variant);
              if (this.variant) {
                this.variant.id = null; // Reset the ID for the new variant
              }
              this.initName = this.variant?.name || '';
            },
            error: async (err) => {
              console.error('Error fetching variant:', err);
              const notification = await this.presentError(err);
              await notification.present();

              loading.dismiss();
            }
          });
        }
        else
          this.variant = new RecipeVariant(this.recipeId);

      } else if (this.recipeId && this.variantId) {
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.variantService.getById(this.variantId).subscribe({
          next: (variant: IRecipeVariant | null) => {
            loading.dismiss();
            this.variant = variant;
            this.initName = this.variant?.name || '';
          },
          error: async (err) => {
            loading.dismiss();
            const notification = await this.presentError(err);
            await notification.present();
            console.error('Error fetching variant:', err);
          }

        });

      }

    });

  }

  async saveVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const variant = await this.variantEditComponent.getVariant();
    if (variant) {
      if (this.isCreatingRecipe) {
        this.newRecipeData?.variants.push(variant);
        this.router.navigate(['/tabs/recipes', 'new'], {
          state: {
            recipeData: this.newRecipeData,
          },
        });
      }
      else {
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.variantService.saveItem(variant).subscribe({
          next: async (res: IRecipeVariant) => {
            loading.dismiss();
            this.msg += "creating";
            const notification = await this.presentSuccess(this.translateService.instant('alert.variant-created'));
            this.msg += "created";
            await notification.present();
            this.msg += "presented";

            this.router.navigate(['/tabs/recipes/', this.recipeId, 'variants', res.id]);
          },
          error: async (err: any) => {
            loading.dismiss();
            const notification = await this.presentError(err);
            await notification.present();

            console.error('Error saving variant', err);
          }
        });
      }

    }
  }

  async closeVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.isAnyChange) {
      const alert = await this.alertService.presentConfirmHighlight(
        this.translateService.instant('recipes.variant.alert.unsaved-changes'),
        this.translateService.instant('recipes.variant.alert.unsaved-changes-message'),
        () => {
          this.router.navigate(['/tabs/recipes/', this.recipeId]);
        });
      await alert.present();
    } else {
      this.router.navigate(['/tabs/recipes/', this.recipeId]);
    }
  }
}
