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
  id: ID;
  recipeId: ID;
  name: string;
  ingredients: IIngredient[];
  proceeding: IProceeding[];
  restrictions: FoodRestriction[];
  historyOfChanges: IHistoryOfChanges[];
}