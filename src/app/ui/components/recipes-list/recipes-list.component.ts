import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { RecipeComponent } from '../recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { IRecipe } from 'src/app/data/interfaces/recipe.interface';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { ID } from 'src/app/types';
import { IDayMealRecipe } from 'src/app/data/interfaces/day-menu.interface';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  imports: [IonList, RecipeComponent, CommonModule],
  standalone: true
})
export class RecipesListComponent implements OnInit, OnChanges {

  @Input({ required: true }) recipes: IRecipe[] = [];
  @Input() isChoosing = false;
  @Input() sortOption: SortOption = SortOption.NAME_ASC;
  @Input() searchValue = '';
  @Input() filter: IFilterOptions | null = null;
  @Input() chosenRecipes: IDayMealRecipe[] = [];

  @Output() navigateToRecipeEvent = new EventEmitter<ID>();

  selectedRecipes = new Set<ID>();


  filteredRecipes: IRecipe[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredRecipes = [...this.recipes];
    this.applySearchValue();
    this.filterRecipes();
    this.sortRecipes();

    this.selectedRecipes = new Set<ID>(this.chosenRecipes.map(recipe => recipe.recipeId));
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      if (propName === 'recipes') {
        this.filteredRecipes = [...this.recipes];
      }

    }
    this.filteredRecipes = [...this.recipes];
    this.applySearchValue();
    this.filterRecipes();
    this.sortRecipes();


  }

  isRecipeSelected(recipeId: ID | null): boolean {
    if (recipeId === null) {
      return false;
    }
    return this.selectedRecipes.has(recipeId);
  }

  navigateToRecipe(recipeId: ID) {
    this.navigateToRecipeEvent.emit(recipeId);
  }

  private applySearchValue() {
    this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  private filterRecipes() {
    this.filteredRecipes = this.filteredRecipes.filter(recipe => {

      return this.recipeHasCourseWhichIsInFilter(recipe)
        && this.recipeHasRestrictionWhichIsInFilter(recipe);
      // && recipe.variants.some(variant => variant.restrictions.some(restriction => this.filter?.restrictions?.includes(restriction)));;

      // if (this.filter?.restrictions && this.filter.restrictions.length > 0) {
      // return 
      // }
      //return true;
    });
  }

  private recipeHasCourseWhichIsInFilter(recipe: IRecipe): boolean {
    if (!this.filter || !this.filter.courses) {
      return true;
    }
    if (this.filter.courses.size === 0) {
      return true;
    }
    return (recipe.courses.some(course => this.filter && this.filter.courses && this.filter.courses.has(course)));
  }

  private recipeHasRestrictionWhichIsInFilter(recipe: IRecipe): boolean {
    if (!this.filter || !this.filter.restrictions) {
      return true;
    }
    if (this.filter.restrictions.size === 0) {
      return true;
    }
    return recipe.variants.some(variant => {
      const restrictionsSet = new Set(variant.restrictions);
      return this.filter && this.filter.restrictions && [...this.filter.restrictions].some(restriction => restrictionsSet.has(restriction));
    });
  }

  private sortRecipes() {
    switch (this.sortOption) {
      case SortOption.NAME_ASC:
        this.filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOption.NAME_DESC:
        this.filteredRecipes.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  selectionChanged(event: { recipeId: ID, selected: boolean; }) {
    if (event.selected) {
      this.selectedRecipes.add(event.recipeId);
    } else {
      this.selectedRecipes.delete(event.recipeId);
    }
  }
}
