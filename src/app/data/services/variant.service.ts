import { Injectable } from "@angular/core";
import { IRecipeVariant } from "../interfaces/recipe-variant.interface";
import { IBaseService } from "../interfaces/base-service.interface";
import { BaseRecipeService } from "./base-recipe.service";
import { Observable, of, throwError } from "rxjs";
import { ID } from "src/app/types";

@Injectable({
  providedIn: 'root'
})
export class VariantService {


  constructor(private base: BaseRecipeService) {
  }

  getById(variantId: ID): Observable<IRecipeVariant | null> {

    const recipe = this.base.dummyRecipes.find(recipe =>
      recipe.variants.some(variant => variant.id === variantId)
    );
    const variant = recipe?.variants.find(variant => variant.id === variantId);
    return of(variant || null);
  };

  getVariants(recipeID: ID, selectedIds: ID[]): Observable<IRecipeVariant[]> {
    const recipe = this.base.dummyRecipes.find(recipe => recipe.id === recipeID);
    if (recipe) {
      return of(recipe.variants.filter(variant => variant.id && selectedIds.includes(variant.id)));
    }
    return of([]);
  };

  saveItem(variant: IRecipeVariant) {
    this.base.oldRecipes = this.base.dummyRecipes;

    const recipe = this.base.dummyRecipes.find(recipe => recipe.id === variant.recipeId);
    if (recipe) {
      const index = recipe.variants.findIndex(v => v.id === variant.id);
      if (variant.id === null || variant.id === '') {
        variant.id = this.base.getNewVariantId();
      }
      if (index === -1) {
        recipe.variants.push(variant);
      } else {
        recipe.variants[index] = variant;
      }
    }

    return of(variant);
  }

  deleteById(variantId: ID): Observable<IRecipeVariant[]> {

    this.base.oldRecipes = this.base.dummyRecipes;

    this.base.dummyRecipes.forEach(recipe => {
      recipe.variants = recipe.variants.filter(variant => variant.id !== variantId);
    });
    return of();
  };

  deleteSelected(recipeId: ID, variantIds: ID[]): Observable<IRecipeVariant[]> {

    this.base.oldRecipes = this.base.dummyRecipes;

    this.base.dummyRecipes.filter(recipe => recipe.id === recipeId).forEach(recipe => {
      recipe.variants = recipe.variants.filter(variant => variant.id && !variantIds.includes(variant.id));
    });

    const recipe = this.base.dummyRecipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      return of(recipe.variants);
    }
    return throwError(() => new Error('Recipe not found'));

  };

}
