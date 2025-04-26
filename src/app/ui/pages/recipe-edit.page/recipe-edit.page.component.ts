import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonContent, IonIcon, IonRow, IonCol, IonGrid, IonTextarea } from '@ionic/angular/standalone';
import { RecipeDetailComponent } from '../../components/recipe-detail/recipe-detail.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { addIcons } from 'ionicons';
import { save, closeCircle, alert } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { AlertService } from '../../services/alert.service';
import { Recipe } from 'src/app/data/models/recipe';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ID } from 'src/app/types';
import { ViewWillEnter } from '@ionic/angular';
import { BaseComponent } from '../../components/base-component/base.component';

@Component({
  selector: 'app-recipe-edit.page',
  templateUrl: './recipe-edit.page.component.html',
  styleUrls: ['./recipe-edit.page.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButton,
    IonContent,
    IonIcon,

    RecipeDetailComponent,
    TranslateModule,
    CommonModule,
    FormsModule]
})
export class RecipeEditPage extends BaseComponent implements OnInit, ViewWillEnter {

  @ViewChild(RecipeDetailComponent) recipeDetail!: RecipeDetailComponent;

  recipeId: ID | null = null;
  recipe: IRecipe | null = null;
  initRecipe: IRecipe | null = null;
  isCreating = false;

  get hasRecipeName() {
    return this.recipe && this.recipe.name && this.recipe.name.length > 0;
  }

  get isAnyChange() {
    return this.recipe && this.initRecipe && !isEqual(this.recipe, this.initRecipe);
  }

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private alertService: AlertService,
    override translateService: TranslateService,
    private loadingService: LoadingService,
    override toastController: ToastController) {

    super(toastController, translateService);
    addIcons({ save, closeCircle, alert });

  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.recipeId = params['recipeId'];
      this.loadRecipe();
    });
  }

  ionViewWillEnter(): void {
    this.loadRecipe(); // Reload recipes every time the page becomes active
  }

  async saveRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe && this.recipe.variants && this.recipe.variants.length === 0) {
      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('recipes.alert.no-variants'),
        this.translateService.instant('recipes.alert.no-variants-message'),
        () => {
          this.saveRecipeToService();
        });
      await alert.present();
    }
    else if (this.recipe) {
      this.saveRecipeToService();
    }
  }

  async closeRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    if (this.isCreating) {
      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('recipes.alert.cancel-creation'),
        this.translateService.instant('recipes.alert.cancel-creation-message'),
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          this.router.navigate(['/tabs/recipes/']);
        },
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          //nothing happens
        });
      await alert.present();
    }
    else if (!isEqual(this.recipeDetail.recipe, this.initRecipe)) {

      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('recipes.alert.unsaved-changes'),
        this.translateService.instant('recipes.alert.unsaved-changes-message'),
        () => {

          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          this.recipe = this.initRecipe;
          if (this.recipe?.id) {
            this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
          }
          else {
            this.router.navigate(['/tabs/recipes/']);
          }
        },
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          //nothing happens
        });
      await alert.present();
    }
    else {
      this.recipe = this.initRecipe;
      this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
    }

  }

  private async loadRecipe() {
    if (this.recipeId) {
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.recipeService.getById(this.recipeId).pipe(
        finalize(() => loading.dismiss())
      ).subscribe(
        {
          next: (recipe: IRecipe | null) => {
            this.recipe = cloneDeep(recipe);
            this.initRecipe = recipe;
          },
          error: (err: any) => {
            console.error('Error getting recipe', err);
          }
        });
    }
    else {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.recipe = state['recipeData'] || null;
      }
      else {
        this.isCreating = true;
        this.recipe = new Recipe();
      }
      this.initRecipe = cloneDeep(this.recipe);
    }
  }

  private async saveRecipeToService() {
    if (!this.recipe) {
      console.error('Recipe is null. Cannot save recipe.');
      return;
    }
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.recipeService.saveItem(this.recipe).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: async (res: IRecipe) => {
        const notification = await this.presentSuccess(this.translateService.instant('recipes.alert.save-success'));
        await notification.present();

        this.router.navigate(['/tabs/recipes/', res.id]);
      },
      error: async (err: any) => {
        const notification = await this.presentError(this.translateService.instant('recipes.alert.save-error'));
        await notification.present();

        console.error('Error saving recipe', err);
      }
    });
  }

  navigateToNewVariantNewRecipe(recipe: IRecipe) {
    this.router.navigate(['/tabs/recipes', 'new', 'variants', 'new'], { state: { recipeData: recipe } });
  }

  navigateToNewVariant(variantId: ID | null) {
    if (this.recipe === null) {
      return;
    }
    if (variantId) {
      this.router.navigate(['/tabs/recipes', this.recipe.id, 'variants', 'new'], { state: { variantId: variantId } });
    } else {

      this.router.navigate(['/tabs/recipes', this.recipe.id, 'variants', 'new']);
    }
  }

}
