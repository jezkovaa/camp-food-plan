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
import { RecipeDetailComponent } from '../../components/recipe-detail/recipe-detail.component';
import { AlertService } from '../../services/alert.service';
import { IDayMeal, IDayMealRecipe } from 'src/app/data/interfaces/day-menu.interface';
import { ID } from 'src/app/types';
import { PlanningService } from 'src/app/data/services/planning.service';
import { Course } from 'src/app/data/enums/courses.enum';

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
  course: Course = Course.BREAKFAST;

  dayMenuId: ID | null = null;

  isPlanningRoute = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private planningService: PlanningService

  ) {

    addIcons({ pencil, trash });

  }

  ngOnInit() {
    const firstSegment = this.route.snapshot.url[0].path;
    this.isPlanningRoute = firstSegment === 'planning';

    if (this.isPlanningRoute) {
      this.route.params.subscribe(params => {
        const recipeId = params['recipeId'];
        this.dayMenuId = params['dayMenuId'];
        this.course = params['course'];
        this.recipesService.getRecipe(recipeId).subscribe((recipe: IRecipe) => {
          this.recipe = recipe;
        });
      });
    }

    this.route.params.subscribe(params => {
      const recipeId = params['recipeId'];
      this.recipesService.getRecipe(recipeId).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
      });
    });
  }

  editRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe === null) {
      return;
    }
    this.router.navigate(['/tabs/recipes', this.recipe.id, 'edit']);
  }


  async deleteRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe === null) {
      return;
    }

    let message = this.translateService.instant('alert.delete-confirm-message');
    if (this.recipe.variants.length > 0) {
      message += this.translateService.instant('alert.delete-confirm-message-variants');
    }

    await this.alertService.presentConfirm(
      this.translateService.instant('alert.delete-confirm'),
      message,
      () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
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

  portionsChanged(meal: IDayMeal) {
    if (this.dayMenuId === null) {
      return;
    }
    this.planningService.updateMenu(this.dayMenuId, meal.course, meal.chosenRecipes).subscribe({
      next: () => {
        //path: 'planning/events/:eventId/menu/:dayMenuId/:course/recipe/:recipeId',
        this.router.navigate(['../../../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error updating menu:', error);
      }
    });
  }

}
