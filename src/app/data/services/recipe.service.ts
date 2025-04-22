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
export class RecipeService extends BaseRecipeService implements IBaseService<IRecipe> {

  restrictions = FoodRestriction;


  getAll(): Observable<IRecipe[]> {
    return of(this.dummyRecipes);
  }

  getById(id: ID): Observable<IRecipe | null> {

    const recipe = this.dummyRecipes.find(recipe => recipe.id === id);
    return of(recipe || null);

  }

  saveItem(recipe: IRecipe): Observable<IRecipe> {

    this.oldRecipes = this.dummyRecipes;

    const index = this.dummyRecipes.findIndex(r => r.id === recipe.id);

    if (recipe.id === null) {
      recipe.id = 'r' + this.dummyRecipes.length + 1;
    }

    if (index === -1) {
      this.dummyRecipes.push(recipe);
    } else {
      this.dummyRecipes[index] = recipe;
    }

    return of(recipe);
  }

  deleteById(recipeId: ID): Observable<IRecipe[]> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes = this.dummyRecipes.filter(recipe => recipe.id !== recipeId);

    return of(this.dummyRecipes);
  }

  getNames(chosenRecipes: IDayMealRecipe[]): Observable<IDayMealRecipeNames[]> {
    const filteredRecipes = this.dummyRecipes
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