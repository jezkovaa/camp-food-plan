
import { ID } from "src/app/types";
import { FoodRestriction } from "../enums/food-restriction.enum";
import { IHistoryOfChanges, IIngredient, IProceeding, IRecipeVariant } from "../interfaces/recipe-variant.interface";


export class RecipeVariant implements IRecipeVariant {
  id: ID = "";
  recipeId: ID | null;
  name: string = "";
  ingredients: IIngredient[] = [];
  proceeding: IProceeding[] = [];
  restrictions: Set<FoodRestriction> = new Set<FoodRestriction>();
  historyOfChanges: IHistoryOfChanges[] = [];

  constructor(recipeId: ID | null = null) {
    this.recipeId = recipeId;
  }



}