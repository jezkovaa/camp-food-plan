import { Component, OnChanges, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, IonBackButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { IFilter } from 'src/app/data/interfaces/filter.interface';
import { SearchbarWithButtonsComponent } from '../../components/searchbar-with-buttons/searchbar-with-buttons.component';
import { ID } from 'src/app/types';
import { LoadingService } from '../../services/loading.service';
import { finalize } from 'rxjs';
import { LoadingController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  imports: [IonFabButton, IonFab,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,

    TranslateModule,
    CommonModule,
    RecipesListComponent,

    SearchbarWithButtonsComponent
  ],
  standalone: true
})
export class RecipesPage implements OnInit, OnChanges, ViewWillEnter {

  recipes: IRecipe[] = [];
  sortOption: SortOption = SortOption.NAME_ASC;
  searchValue = '';
  filter: IFilterOptions | null = null;
  appliedFilters: IFilter[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private loadingController: LoadingController
  ) {

  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  ngOnChanges(): void {
    this.loadRecipes();
  }

  ionViewWillEnter(): void {
    this.loadRecipes(); // Reload recipes every time the page becomes active
  }


  async loadRecipes() {
    let loadingElement = await this.loadingService.showLoading();
    await loadingElement.present();
    this.recipeService.getAll().pipe(
      finalize(async () => await loadingElement.dismiss())
    ).subscribe({
      next: (recipes: IRecipe[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error(error);
      }
    });
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

  navigateToRecipe(recipeId: ID) {
    this.router.navigate([recipeId], { relativeTo: this.route });
  }



}
