import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FoodRestriction } from '../enums/food-restriction.enum';
import { IRecipe } from '../interfaces/recipe.interface';
import { ID } from 'src/app/types';
import { IDayMealRecipeNames } from '../interfaces/day-meal-names.interface';
import { IDayMealRecipe } from '../interfaces/day-menu.interface';
import { IBaseService } from '../interfaces/base-service.interface';
import { BaseRecipeService } from './base-recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements IBaseService<IRecipe> {

  restrictions = FoodRestriction;

  constructor(private base: BaseRecipeService) { }


  getAll(): Observable<IRecipe[]> {
    return of(this.base.dummyRecipes);
  }

  getById(id: ID): Observable<IRecipe | null> {

    const recipe = this.base.dummyRecipes.find(recipe => recipe.id === id);
    return of(recipe || null);

  }

  saveItem(recipe: IRecipe): Observable<IRecipe> {

    this.base.oldRecipes = this.base.dummyRecipes;

    const index = this.base.dummyRecipes.findIndex(r => r.id === recipe.id);

    if (recipe.id === null) {
      recipe.id = this.base.getNewRecipeId();
    }

    if (index === -1) {
      this.base.dummyRecipes.push(recipe);
    } else {
      this.base.dummyRecipes[index] = recipe;
    }

    return of(recipe);
  }

  deleteById(recipeId: ID): Observable<IRecipe[]> {

    this.base.oldRecipes = this.base.dummyRecipes;

    this.base.dummyRecipes = this.base.dummyRecipes.filter(recipe => recipe.id !== recipeId);

    return of(this.base.dummyRecipes);
  }

  getNames(chosenRecipes: IDayMealRecipe[]): Observable<IDayMealRecipeNames[]> {
    const filteredRecipes = this.base.dummyRecipes
      .filter(recipe =>
        chosenRecipes.some(chosenRecipe => chosenRecipe.recipeId === recipe.id) // Filter recipes by recipeId
      )
      .map(recipe => ({
        id: recipe.id!,
        name: recipe.name,
        variants: recipe.variants
          .filter(variant =>
            chosenRecipes.some(chosenRecipe =>
              chosenRecipe.recipeId === recipe.id &&
              chosenRecipe.variants.some(chosenVariant => chosenVariant.variantId === variant.id)
            )
          ) // Filter variants by variantId
          .map(variant => ({
            variantId: variant.id!,
            variantName: variant.name,
            variantRestrictions: variant.restrictions
          }))
      }));

    return of(filteredRecipes);
  }
}