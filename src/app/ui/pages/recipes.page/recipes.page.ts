import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonSearchbar, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonBackButton, IonPopover, IonChip, IonLabel } from '@ionic/angular/standalone';
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


@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.page.html',
  styleUrls: ['recipes.page.scss'],
  imports: [IonLabel, IonChip, IonPopover, IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonBackButton,
    TranslateModule,
    CommonModule,
    RecipesListComponent,
    RestrictionHelpComponent,
    SortOptionsComponent,
    RecipesFilterComponent, RestrictionComponent],
  standalone: true
})
export class RecipesPage implements OnInit {

  recipes: IRecipe[] = [];
  sortOption: SortOption = SortOption.NAME_ASC;
  searchValue = '';
  filter: IFilterOptions | null = null;
  appliedFilters: IFilter[] = [];

  @ViewChild("sortPopover") sortPopover!: IonPopover;
  @ViewChild("filterPopover") filterPopover!: IonPopover;

  constructor(
    private recipesService: RecipesService,
    private translateService: TranslateService,
    private router: Router
  ) {
    addIcons({ add, options, help, closeCircle });
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
    this.router.navigate(['tabs', 'recipes', 'new']);
  }

  sortOptionChanged(option: SortOption) {
    this.sortOption = option;
    this.sortPopover.dismiss();
  }

  filterChanged(filter: IFilterOptions) {
    this.filter = filter;
    this.appliedFilters = [];
    if (this.filter) {
      if (this.filter.courses.length > 0) {
        this.filter.courses.forEach((course) => {
          this.appliedFilters.push({
            name: this.translateService.instant(`courses.${course}`),
            type: FilterType.COURSE,
            value: course
          });
        });
      }
      if (this.filter.restrictions.length > 0) {
        this.filter.restrictions.forEach((restriction) => {
          this.appliedFilters.push({
            name: this.translateService.instant(`food-restriction.${restriction}`),
            type: FilterType.FOOD_RESTRICTION,
            value: restriction
          });
        });
      }
    }
    this.filterPopover.dismiss();
  }

  removeFilter(filter: IFilter) {
    if (filter.type === FilterType.COURSE) {
      if (Object.values(Course).includes(filter.value as Course) && this.filter?.courses.includes(filter.value as Course)) {
        if (this.filter?.courses) {
          this.filter.courses = this.filter.courses.filter((_, i) => i !== this.filter!.courses!.indexOf(filter.value as Course));
          this.filter = cloneDeep(this.filter);
        }
      }
    } else if (Object.values(FoodRestriction).includes(filter.value as FoodRestriction) && this.filter?.restrictions.includes(filter.value as FoodRestriction)) {
      if (this.filter?.restrictions) {
        this.filter.restrictions = this.filter.restrictions.filter((_, i) => i !== this.filter!.restrictions!.indexOf(filter.value as FoodRestriction));
        this.filter = cloneDeep(this.filter);
      }
    }
    this.appliedFilters.splice(this.appliedFilters.indexOf(filter), 1);

  }

  isFoodRestrictionFilter(type: FilterType): boolean {
    return type === FilterType.FOOD_RESTRICTION;
  }

  getFilterValue(value: Course | FoodRestriction): FoodRestriction[] {
    if (Object.values(FoodRestriction).includes(value as FoodRestriction)) {
      return [value as FoodRestriction];
    }
    return [];

  }
}
