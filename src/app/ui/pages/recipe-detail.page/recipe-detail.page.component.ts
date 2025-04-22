import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../data/services/recipe.service';
import { MenuService } from '../../../data/services/menu.service';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon, IonBackButton, PopoverController, IonPopover } from '@ionic/angular/standalone';
import { IRecipe } from '../../../data/interfaces/recipe.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencil, trash } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecipesPage } from '../recipes.page/recipes.page';
import { RecipeDetailComponent } from '../../components/recipe-detail/recipe-detail.component';
import { AlertService } from '../../services/alert.service';
import { IDayMeal, IDayMealRecipe, IDayMealRecipeVariant, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ID } from 'src/app/types';
import { BasePlanningService } from 'src/app/data/services/base-planning.service';
import { Course } from 'src/app/data/enums/courses.enum';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe.page',
  templateUrl: './recipe-detail.page.component.html',
  styleUrls: ['./recipe-detail.page.component.scss'],
  imports: [IonPopover,
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

  @ViewChild('editPopover') editPopover!: IonPopover;

  recipe: IRecipe | null = null;
  component = RecipesPage;
  course: Course = Course.BREAKFAST;

  selectedRecipes: ID[] = [];
  selectedVariants: IDayMealRecipeVariant[] = [];

  dayMenuId: ID | null = null;

  isPlanningRoute = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipeService,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService,
    private menuService: MenuService,
    private notificationService: NotificationService,
    private loadingService: LoadingService

  ) {

    addIcons({ pencil, trash });

  }

  ngOnInit() {
    const firstSegment = this.route.snapshot.url[0].path;
    this.isPlanningRoute = firstSegment === 'planning';

    if (this.isPlanningRoute) {
      this.route.params.subscribe(async params => {
        this.dayMenuId = params['dayMenuId'];
        this.course = params['course'];
        const recipeId = params['recipeId'];
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.recipesService.getById(recipeId).subscribe((recipe: IRecipe | null) => {
          loading.dismiss();
          this.recipe = recipe;
        });
      });

      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.selectedRecipes = state['selectedRecipesArray'] || [];
        this.selectedVariants = state['selectedVariants'] || [];
      }
    }

    this.route.params.subscribe(async params => {
      const recipeId = params['recipeId'];
      const loading = await this.loadingService.showLoading();
      await loading.present();
      this.recipesService.getById(recipeId).subscribe((recipe: IRecipe | null) => {
        loading.dismiss();
        this.recipe = recipe;
      });
    });
  }

  redirectToRecipeEditPage() {
    this.editPopover.dismiss();
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['/tabs/recipes', this.recipe?.id, 'edit']);
  }

  redirectToRecipeVariantEditPage() {
    this.editPopover.dismiss();
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['/tabs/recipes', this.recipe?.id, 'variants', this.recipe?.variants[0].id, 'edit']);
  }

  async editRecipe(event: MouseEvent) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.recipe === null) {
      return;
    }
    if (this.recipe.variants.length === 1) {
      this.editPopover.event = event;
      await this.editPopover.present();
    }
    else {
      this.router.navigate(['/tabs/recipes', this.recipe.id, 'edit']);
    }

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

    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('alert.delete-confirm'),
      message,
      async () => {
        const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
        buttonElement.blur();
        if (this.recipe && this.recipe.id) {
          const loading = await this.loadingService.showLoading();
          await loading.present();
          this.recipesService.deleteById(this.recipe.id)
            .pipe(
              finalize(() => loading.dismiss()))
            .subscribe({
              next: async (recipes: IRecipe[]) => {
                const toast = await this.notificationService.presentToast(
                  this.translateService.instant('alert.recipe-deleted'),
                );
                await toast.present();
                this.router.navigate(['/tabs/recipes'], {
                  state: {
                    recipes: recipes
                  }
                });
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

  async portionsChanged(meal: IDayMeal) {
    if (this.dayMenuId === null) {
      return;
    }
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.menuService.updateMenu(this.dayMenuId, meal.course, meal.chosenRecipes).pipe(
      finalize(() => loading.dismiss())
    ).subscribe({
      next: (dayMenu: IDayMenu) => {

        if (this.selectedRecipes.length > 0) {
          //variants for one recipe are chosen, need to choose other recipes variants
          const id = this.selectedRecipes.shift();
          this.router.navigate(['../', id], { relativeTo: this.route, state: { selectedRecipesArray: this.selectedRecipes } });
        } else {
          if (this.isPlanningRoute && this.selectedVariants.length > 0) {
            //no more recipes to choose, navigate back
            this.router.navigate(['../../edit'], { relativeTo: this.route });
          } else {

            this.router.navigate(['../../../'], { relativeTo: this.route });
          }
          //no more recipes to choose, navigate back
        }
        //path: 'planning/events/:eventId/menu/:dayMenuId/:course/recipe/:recipeId',
      },
      error: (error) => {
        console.error('Error updating menu:', error);
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
    }
    this.router.navigate(['/tabs/recipes', this.recipe.id, 'variants', 'new']);
  }

}
