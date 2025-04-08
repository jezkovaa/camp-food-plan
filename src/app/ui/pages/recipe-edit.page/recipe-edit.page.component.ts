import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonContent, IonIcon, IonRow, IonCol, IonGrid, IonTextarea } from '@ionic/angular/standalone';
import { RecipeDetailComponent } from '../../components/recipe-detail/recipe-detail.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { addIcons } from 'ionicons';
import { save, closeCircle } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { AlertService } from '../../services/alert.service';
import { Recipe } from 'src/app/data/models/recipe';

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
export class RecipeEditPage implements OnInit {

  @ViewChild(RecipeDetailComponent) recipeDetail!: RecipeDetailComponent;

  recipe: IRecipe | null = null;
  initRecipe: IRecipe | null = null;
  isCreating = false;

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService) {

    addIcons({ save, closeCircle });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = params['recipeId'];
      if (recipeId) {
        this.recipesService.getRecipe(recipeId).subscribe(
          {
            next: (recipe: IRecipe) => {
              this.recipe = cloneDeep(recipe);
              this.initRecipe = recipe;
            },
            error: (err: any) => {
              console.error('Error getting recipe', err);
            }
          });
      }
      else {
        this.isCreating = true;
        this.recipe = new Recipe();
        this.initRecipe = cloneDeep(this.recipe);
      }
    });
  }

  async saveRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    const same = isEqual(this.recipeDetail.recipe, this.initRecipe);
    if (same && this.isCreating) {
      await this.alertService.presentAlert(
        this.translateService.instant('recipes.alert.empty-recipe'),
        this.translateService.instant('recipes.alert.empty-recipe-message'));
    }
    else if (same) {
      await this.alertService.presentAlert(
        this.translateService.instant('recipes.alert.no-changes'),
        this.translateService.instant('recipes.alert.no-changes-message'));
    }
    else if (this.recipe) {
      this.recipesService.saveRecipe(this.recipe).subscribe({
        next: (res: Recipe) => {
          this.router.navigate(['/tabs/recipes/', res.id]);
        },
        error: (err: any) => {
          console.error('Error saving recipe', err);
        }
      });
    }
  }

  async closeRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    if (this.isCreating) {
      await this.alertService.presentConfirm(
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
    }
    else if (!isEqual(this.recipeDetail.recipe, this.initRecipe)) {

      await this.alertService.presentConfirm(
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
    }
    else {
      this.recipe = this.initRecipe;
      this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
    }

  }

}
