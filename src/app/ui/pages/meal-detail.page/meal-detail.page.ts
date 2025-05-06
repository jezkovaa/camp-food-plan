import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonButton, IonIcon, IonLabel, IonInput, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { IDayMeal, IDayMealRecipe, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Course } from 'src/app/data/enums/courses.enum';
import { addIcons } from 'ionicons';
import { add, closeCircle, pencil, save, trash } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { ID } from 'src/app/types';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { IDayMealRecipeNames } from 'src/app/data/interfaces/day-meal-names.interface';
import { RestrictionComponent } from "../../components/restriction/restriction.component";
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { MenuService } from 'src/app/data/services/menu.service';
import { clone, cloneDeep, isEqual } from 'lodash';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { ToastController } from '@ionic/angular';
import { BaseComponent } from '../../components/base-component/base.component';
import { MultipleRestrictionsComponent } from '../../components/multiple-restrictions/multiple-restrictions.component';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonIcon, IonButton, IonItem, IonList,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    TranslateModule,
    CommonModule,
    FormsModule,

    MultipleRestrictionsComponent]
})
export class MealDetailPage extends BaseComponent implements OnInit {

  meal: IDayMeal | null = null;
  initMeal: IDayMeal | null = null;
  date: Date | null = null;

  dayMenuId: ID | null = null;
  eventId: ID | null = null;

  recipeNames: IDayMealRecipeNames[] = [];

  get courseName(): string {
    if (!this.meal) {
      return '';
    }
    switch (this.meal.course) {
      case Course.BREAKFAST:
        return this.translateService.instant('courses.BREAKFAST');
      case Course.LUNCH:
        return this.translateService.instant('courses.LUNCH');;
      case Course.DINNER:
        return this.translateService.instant('courses.DINNER');;
      case Course.SNACK:
        return this.translateService.instant('courses.SNACK');
      case Course.MORNING_SNACK:
        return this.translateService.instant('courses.MORNING_SNACK');
      default:
        return this.translateService.instant('courses.BREAKFAST');;
    }
  }

  constructor(private route: ActivatedRoute,
    private menuService: MenuService,
    override translateService: TranslateService,
    private recipesService: RecipeService,
    private router: Router,
    override toastController: ToastController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private navController: NavController,
    private cdr: ChangeDetectorRef) {
    super(toastController, translateService);
    addIcons({ add, trash, pencil, save, closeCircle });
  }

  get isAnyChange(): boolean {
    if (this.meal && this.initMeal) {
      return !isEqual(this.meal, this.initMeal);
    }
    if (this.meal && !this.initMeal) {
      return true;
    }
    if (this.initMeal && !this.meal) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.eventId = params['eventId'];
      this.dayMenuId = params['dayMenuId'];
      const mealId = params['mealId'];
      if (!this.eventId || !this.dayMenuId || !mealId) {
        return;
      }

      const loading = await this.loadingService.showLoading();
      await loading.present();;
      this.menuService.getMeal(this.eventId, this.dayMenuId, mealId).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
        next: ({ meal, date }: { meal: IDayMeal; date: Date; }) => {
          this.meal = meal;
          this.initMeal = cloneDeep(meal);
          this.date = date;

          this.getNames();
        },
        error: (err: any) => {
          console.error('Error fetching meal details:', err);
        }
      });

    });
  }

  getRecipeName(recipeId: ID): string {
    return this.recipeNames.find(recipe => recipe.id === recipeId)?.name || this.translateService.instant('planning.day-menu-overview.no-recipe');
  }

  getVariantName(recipeId: ID, variantId: ID): string {
    const recipe = this.recipeNames.find(recipe => recipe.id === recipeId);
    if (!recipe) {
      return this.translateService.instant('planning.day-menu-overview.no-recipe');
    }
    const variant = recipe.variants.find(variant => variant.variantId === variantId);
    if (!variant) {
      return this.translateService.instant('planning.day-menu-overview.no-variant');
    }
    return variant.variantName;

  }

  getRestrictions(recipeId: ID, variantId: ID): Set<FoodRestriction> {
    return new Set(this.recipeNames.find(recipe => recipe.id === recipeId)?.variants.find(variant => variant.variantId === variantId)?.variantRestrictions || []);
  }

  addRecipe() {
    //planning/events/:eventId/menu/:dayMenuId/:course
    this.router.navigate(['/', 'tabs', 'planning', 'events', this.eventId, 'menu', this.dayMenuId, this.meal?.course, 'recipes'], {
      state: {
        chosenRecipes: this.meal?.chosenRecipes,
      }
    });
  }

  async deleteRecipe(recipeId: ID) {

    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('planning.day-menu.meal-alert-title'),
      this.translateService.instant('planning.day-menu.meal-alert-message'),
      async () => {
        if (!this.dayMenuId || !this.meal) {
          return;
        }
        const oldMeal = cloneDeep(this.meal.chosenRecipes);
        this.meal.chosenRecipes = this.meal.chosenRecipes.filter(recipe => recipe.recipeId !== recipeId);
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.menuService.updateMenu(this.dayMenuId, this.meal.course, this.meal.chosenRecipes).pipe(
          finalize(() => loading.dismiss())
        ).subscribe({
          next: async (menu: IDayMenu) => {
            await this.updateMenuWithTakeBack(menu, oldMeal);
          }
          , error: (err: any) => {
            console.error('Error deleting recipe:', err);
          }
        });
      }
    );
    await alert.present();

  }


  async deleteVariant(recipeId: ID, variantId: ID) {
    if (!this.dayMenuId || !this.meal) {
      return;
    }
    let message = this.translateService.instant('planning.day-menu.meal-variant-alert-message');
    if (this.meal.chosenRecipes.length === 1) {
      message += this.translateService.instant('planning.day-menu.meal-variant-alert-message-single-recipe');
    }
    const alert = await this.alertService.presentConfirm(
      this.translateService.instant('planning.day-menu.meal-variant-alert-title'),
      message,
      async () => {
        if (!this.dayMenuId || !this.meal) {
          return;
        }
        const oldMeal = cloneDeep(this.meal.chosenRecipes);
        this.meal.chosenRecipes = this.meal.chosenRecipes
          .map(recipe => {
            if (recipe.recipeId === recipeId) {
              const updatedRecipe = {
                ...recipe,
                variants: recipe.variants.filter(variant => variant.variantId !== variantId)
              };
              return updatedRecipe.variants.length > 0 ? updatedRecipe : null;
            }
            return recipe;
          })
          .filter((recipe): recipe is IDayMealRecipe => recipe !== null);
        const loading = await this.loadingService.showLoading();
        await loading.present();
        this.menuService.updateMenu(this.dayMenuId, this.meal.course, this.meal.chosenRecipes).pipe(
          finalize(() => loading.dismiss())
        ).subscribe({
          next: (menu: IDayMenu) => {
            this.updateMenuWithTakeBack(menu, oldMeal);
          }
          , error: (err: any) => {
            console.error('Error deleting recipe:', err);
          }
        });
      });
    await alert.present();

  }

  editRecipe(recipeId: ID) {
    if (!this.eventId || !this.meal) {
      return;
    }
    const chosenRecipe = this.meal?.chosenRecipes.filter(recipe => recipe.recipeId === recipeId)[0];
    if (!chosenRecipe) {
      return;
    }

    this.router.navigate(['/', 'tabs', 'planning', 'events', this.eventId, 'menu', this.dayMenuId, this.meal.course, 'recipes', recipeId], {
      state: {
        selectedVariants: chosenRecipe.variants,
      }
    });
  }


  private getNames() {
    if (!this.meal) {
      return;
    }
    this.recipesService.getNames(this.meal.chosenRecipes).subscribe({
      next: (recipesNames: IDayMealRecipeNames[]) => {
        this.recipeNames = recipesNames;
      },
      error: (err: any) => {
        console.error('Error fetching recipe names:', err);
      }
    });
  }

  async save() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.isAnyChange && this.dayMenuId && this.meal) {
      if (this.meal.chosenRecipes.length === 0) {
        const alert = await this.alertService.presentConfirm(
          this.translateService.instant('planning.day-menu.meal-alert-title'),
          this.translateService.instant('planning.day-menu.meal-alert-message'),
          () => {
            if (!this.eventId || !this.dayMenuId || !this.meal || !this.meal.id) {
              return;
            }

            this.menuService.deleteMealFromMenu(this.eventId, this.dayMenuId, this.meal.id).subscribe({
              next: async (menu: IDayMenu) => {
                this.meal = null;
                const notification = await this.presentSuccess(this.translateService.instant('planning.day-menu.success-deleted'));
                await notification.present();
                this.cdr.detectChanges();
                this.router.navigate(['/tabs/planning/events', this.eventId, 'menu', this.dayMenuId]);

                //this.router.navigate(['/tabs/planning/events', this.eventId, 'menu', this.dayMenuId]);
              },
              error: async (err: any) => {
                const notification = await this.presentError(err);
                await notification.present();
                console.error('Error deleting meal:', err);
                this.router.navigate(['/tabs/planning/events', this.eventId, 'menu', this.dayMenuId]);
              }
            });


          },
          () => {
            const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
            buttonElement.blur();
          });
        await alert.present();
      } else {
        this.menuService.updateMenu(this.dayMenuId, this.meal?.course, this.meal?.chosenRecipes).subscribe({
          next: async (menu: IDayMenu) => {
            this.meal = menu.meals.find(meal => meal.course === this.meal?.course) || null;
            this.cdr.detectChanges();
            const notification = await this.presentSuccess(this.translateService.instant('planning.day-menu.success-updated'));
            await notification.present();
            this.navController.back();
          },
          error: async (err: any) => {
            const notification = await this.presentError(err);
            await notification.present();

            console.error('Error saving meal:', err);
          }
        });
      }


    }
    else {
      this.navController.back();
    }
  }

  async close() {

    if (this.isAnyChange) {
      const alert = await this.alertService.presentConfirmHighlight(
        this.translateService.instant('alert.unsaved-changes'),
        this.translateService.instant('alert.unsaved-changes-message'),
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
          this.meal = this.initMeal;
          this.navController.back();
        },
        () => {
          const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
          buttonElement.blur();
        });
      await alert.present();
    }
    else {
      this.meal = this.initMeal;
      this.navController.back();
    }

  }

  private async updateMenuWithTakeBack(menu: IDayMenu, oldMeal: IDayMealRecipe[]) {
    this.meal = menu.meals.find(meal => meal.course === this.meal?.course) || null;
    const notification = await this.presentSuccessWithTakeBack(
      this.translateService.instant('planning.day-menu.success-deleted'),
      () => {
        if (!this.dayMenuId || !this.meal) {
          return;
        }
        this.menuService.updateMenu(this.dayMenuId, this.meal.course, oldMeal).subscribe({
          next: (menu: IDayMenu) => {
            this.meal = menu.meals.find(meal => meal.course === this.meal?.course) || null;
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            console.error('Error deleting recipe:', err);
          }
        });
      }
    );
    await notification.present();
  }


}
