import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTextarea } from '@ionic/angular/standalone';
import { ID } from 'src/app/types';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipeVariantDetailComponent } from '../../components/recipe-variant-detail/recipe-variant-detail.component';
import { VariantEditComponent } from '../../components/variant-edit/variant-edit.component';
import { addIcons } from 'ionicons';
import { closeCircle, save } from 'ionicons/icons';
import { RecipeVariant } from 'src/app/data/models/recipe-variant';
import { cloneDeep, isEqual } from 'lodash';
import { AlertService } from '../../services/alert.service';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';

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
export class VariantEditPage implements OnInit {

  @ViewChild(VariantEditComponent) variantEditComponent!: VariantEditComponent;

  recipeId: ID | null = null;
  variantId: ID | null = null;

  variant: IRecipeVariant | null = null;
  initVariant: IRecipeVariant | null = null;
  isCreating = false;

  isCreatingRecipe = false;
  newRecipeData: IRecipe | null = null;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipesService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router) {
    addIcons({ save, closeCircle });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
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
        this.initVariant = cloneDeep(this.variant);
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
          this.recipeService.getVariant(this.recipeId, createdFromId).subscribe({
            next: (variant: IRecipeVariant | null) => {
              this.variant = cloneDeep(variant);
              if (this.variant) {
                this.variant.id = null; // Reset the ID for the new variant
              }
              this.initVariant = cloneDeep(this.variant);
            },
            error: (err) => {
              console.error('Error fetching variant:', err);
            }
          });
        }
        else
          this.variant = new RecipeVariant(this.recipeId);
        this.initVariant = cloneDeep(this.variant);

      } else if (this.recipeId && this.variantId) {
        this.recipeService.getVariant(this.recipeId, this.variantId).subscribe({
          next: (variant: IRecipeVariant | null) => {
            this.variant = variant;
            this.initVariant = cloneDeep(this.variant);
          },
          error: (err) => {
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
    if (variant === null) {
      //invalid data in variant
      return;
    }
    const same = isEqual(variant, this.initVariant);
    if (same) {
      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('recipes.variant.alert.no-changes'),
        this.translateService.instant('recipes.variant.alert.no-changes-message'),
        () => {
          if (this.isCreatingRecipe) {
            this.router.navigate(['/tabs/recipes', 'new'], {
              state: {
                recipeData: this.newRecipeData,
              },
            });
          }
          else {
            this.router.navigate(['/tabs/recipes/', this.recipeId]);
          }
        });
      await alert.present();
    }
    else if (this.variant) {
      if (this.isCreatingRecipe) {
        this.newRecipeData?.variants.push(variant);
        this.router.navigate(['/tabs/recipes', 'new'], {
          state: {
            recipeData: this.newRecipeData,
          },
        });
      }
      else {
        this.recipeService.saveVariant(this.variant).subscribe({
          next: (res: IRecipeVariant) => {
            this.router.navigate(['/tabs/recipes/', this.recipeId, 'variants', res.id]);
          },
          error: (err: any) => {
            console.error('Error saving variant', err);
          }
        });
      }

    }
  }

  async closeVariant() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.variant = this.variantEditComponent.getVariantWithoutControl();
    if (this.variant && !isEqual(this.variant, this.initVariant)) {
      const alert = await this.alertService.presentConfirm(
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
