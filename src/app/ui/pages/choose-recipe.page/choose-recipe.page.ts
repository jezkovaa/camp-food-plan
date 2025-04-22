import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { RecipesListComponent } from 'src/app/ui/components/recipes-list/recipes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from 'src/app/types';
import { Course } from 'src/app/data/enums/courses.enum';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { Recipe } from 'src/app/data/models/recipe';
import { IFilter } from 'src/app/data/interfaces/filter.interface';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { SearchbarWithButtonsComponent } from '../../components/searchbar-with-buttons/searchbar-with-buttons.component';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { IDayMealRecipe } from 'src/app/data/interfaces/day-menu.interface';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-choose-recipe',
  templateUrl: './choose-recipe.page.html',
  styleUrls: ['./choose-recipe.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonBackButton,


    CommonModule,
    FormsModule,
    TranslateModule,

    RecipesListComponent,
    SearchbarWithButtonsComponent]
})
export class ChooseRecipePage implements OnInit {

  eventId: ID | null = null;
  dayMenuId: ID | null = null;
  course: Course | null = null;

  recipes: Recipe[] = [];

  searchValue = '';
  filter: IFilterOptions | null = null;
  sortOption = SortOption.NAME_ASC;

  chosenRecipes: IDayMealRecipe[] = [];


  @ViewChild(RecipesListComponent) recipesList!: RecipesListComponent;


  constructor(private route: ActivatedRoute,
    private recipesService: RecipeService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.dayMenuId = params['dayMenuId'];
      this.course = params['course'];
      if (this.course) {
        this.filter = {
          courses: new Set<Course>([this.course]),
          restrictions: new Set<FoodRestriction>(),
        };
      }
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.chosenRecipes = state['chosenRecipes'] || [];

      }

    });

    this.loadRecipes();

  }

  createRecipe() {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.router.navigate(['tabs', 'recipes', 'new']);
  }

  sortOptionChanged(option: SortOption) {
    this.sortOption = option;
  }

  searchValueChanged(value: string) {
    this.searchValue = value;
  }

  filterChanged(filter: IFilterOptions) {
    this.filter = filter;
  }


  chooseSelected() {
    const selectedRecipes = this.recipesList.selectedRecipes;
    let selectedRecipesArray = Array.from(selectedRecipes.values());
    if (selectedRecipesArray.length === 0) {
      return;
    }
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();

    const recipeId = selectedRecipesArray[0];

    selectedRecipesArray = selectedRecipesArray.filter(recipeId => recipeId !== recipeId);
    this.router.navigate([recipeId], { relativeTo: this.route, state: { selectedRecipesArray: selectedRecipesArray } },);
    //open one of the recipe, choose variants and portions for it and return back here
  }

  navigateToRecipe(recipeId: ID) {
    //this does nothing - the button is not clickable
  }

  private async loadRecipes() {
    const loading = await this.loadingService.showLoading();
    await loading.present();
    this.recipesService.getAll().subscribe((recipes: IRecipe[]) => {
      loading.dismiss();
      this.recipes = recipes;
    });
  }

}
