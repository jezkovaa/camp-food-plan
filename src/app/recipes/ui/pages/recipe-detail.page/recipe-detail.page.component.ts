import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../data/services/recipes.service';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { IRecipe } from '../../../data/interfaces/recipe.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipesPage } from '../recipes.page/recipes.page';
import { RecipeDetailComponent } from '../../components/recipe-components/recipe-detail/recipe-detail.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-recipe.page',
  templateUrl: './recipe-detail.page.component.html',
  styleUrls: ['./recipe-detail.page.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButtons,
    CommonModule, TranslateModule,
    RecipeDetailComponent],
  standalone: true
})
export class RecipeDetailPage implements OnInit {

  recipe: IRecipe | null = null;
  component = RecipesPage;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService

  ) {

    addIcons({ pencil, trash });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const recipeId = params['id'];
      this.recipesService.getRecipe(recipeId).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
      });
    });
  }

  editRecipe() {
    if (this.recipe === null) {
      return;
    }
    this.router.navigate(['/tabs/recipes', this.recipe.id, 'edit']);
  }


  async deleteRecipe() {
    if (this.recipe === null) {
      return;
    }

    let message = this.translateService.instant('alert.delete-confirm-message');
    if (this.recipe.variants.length > 0) {
      message += this.translateService.instant('alert.delete-confirm-message-variants');
    }

    this.alertService.presentConfirm(
      this.translateService.instant('alert.delete-confirm'),
      message,
      () => {
        if (this.recipe && this.recipe.id) {
          this.recipesService.deleteRecipe(this.recipe.id).subscribe({
            next: async () => {
              this.router.navigate(['/tabs/recipes']);
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
