import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonSearchbar, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonBackButton, IonPopover, IonChip, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, help, options, closeCircle } from 'ionicons/icons';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { RecipesService } from 'src/app/data/services/recipes.service';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RestrictionHelpComponent } from "../../components/restriction-help/restriction-help.component";
import { SortOptionsComponent } from '../../components/sort-options/sort-options.component';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { RecipesFilterComponent } from '../../components/recipes-filter/recipes-filter.component';
import { IFilter } from 'src/app/data/interfaces/filter.interface';
import { FilterType } from 'src/app/data/enums/filter-type.enum';
import { Course } from 'src/app/data/enums/courses.enum';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { RestrictionComponent } from "../../components/restriction/restriction.component";
import { clone, cloneDeep } from 'lodash';
import { SearchbarWithButtonsComponent } from '../../components/searchbar-with-buttons/searchbar-with-buttons.component';


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
    IonButton,
    IonButtons,
    IonBackButton,

    TranslateModule,
    CommonModule,
    RecipesListComponent,

    SearchbarWithButtonsComponent
  ],
  standalone: true
})
export class RecipesPage implements OnInit {

  recipes: IRecipe[] = [];
  sortOption: SortOption = SortOption.NAME_ASC;
  searchValue = '';
  filter: IFilterOptions | null = null;
  appliedFilters: IFilter[] = [];


  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipesService.getRecipes().subscribe((recipes: IRecipe[]) => {
      this.recipes = recipes;
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



}
