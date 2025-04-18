import { ID } from "src/app/types";
import { FoodRestriction } from "../enums/food-restriction.enum";
import { Units } from "../enums/units.enum";

export interface IIngredient {
  name: string;
  unit: Units | null;
  quantity: number | null;
  durability: number | null;
}

export interface IProceeding {

  order: number;
  description: string;
}

export interface IHistoryOfChanges {

  date: Date;
  changes: string;
}

export interface IRecipeVariant {
  id: ID | null;
  recipeId: ID | null; //null if the recipe is not saved yet
  name: string;
  ingredients: IIngredient[];
  proceeding: IProceeding[];
  restrictions: FoodRestriction[];
  historyOfChanges: IHistoryOfChanges[];
}