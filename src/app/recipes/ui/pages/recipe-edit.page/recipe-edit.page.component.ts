import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonContent, IonIcon, IonRow, IonCol, IonGrid, IonTextarea } from '@ionic/angular/standalone';
import { RecipeDetailComponent } from '../../components/recipe-components/recipe-detail/recipe-detail.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes/data/services/recipes.service';
import { Recipe } from 'src/app/recipes/data/interfaces/recipe.interface';
import { addIcons } from 'ionicons';
import { save, closeCircle } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-recipe-edit.page',
  templateUrl: './recipe-edit.page.component.html',
  styleUrls: ['./recipe-edit.page.component.scss'],
  standalone: true,
  imports: [IonTextarea,
    IonButtons,
    IonGrid,
    IonCol,
    IonRow,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButton,
    IonContent,
    IonIcon,

    RecipeDetailComponent,
    TranslateModule,
    CommonModule,
    FormsModule],
  providers: [TranslateService, TranslateStore]
})
export class RecipeEditPage implements OnInit {

  @ViewChild(RecipeDetailComponent) recipeDetail!: RecipeDetailComponent;

  recipe: Recipe | null = null;
  initRecipe: Recipe | null = null;

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService) {

    addIcons({ save, closeCircle });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      this.recipesService.getRecipe(recipeId).subscribe((recipe: Recipe) => {
        this.recipe = cloneDeep(recipe);
        this.initRecipe = recipe;
      });
    });
  }

  async saveRecipe() {
    if (isEqual(this.recipeDetail.recipe, this.initRecipe)) {
      this.alertService.presentAlert(
        this.translateService.instant('alert.no-changes'),
        this.translateService.instant('alert.no-changes-message'),);
    }
    else if (this.recipe) {
      this.recipesService.saveRecipe(this.recipe).subscribe({
        next: (res: any) => {
          this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
        },
        error: (err: any) => {
          console.error('Error saving recipe', err);
        }
      });
    }
  }

  async closeRecipe() {

    if (!isEqual(this.recipeDetail.recipe, this.initRecipe)) {

      this.alertService.presentConfirm(
        this.translateService.instant('alert.unsaved-changes'),
        this.translateService.instant('alert.unsaved-changes-message'),
        () => {
          this.recipe = this.initRecipe;
          this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
        },
        () => {
          console.log('Cancel clicked');
        });
    }
    else {
      this.recipe = this.initRecipe;
      this.router.navigate(['/tabs/recipes/', this.recipe?.id]);
    }

  }

}
