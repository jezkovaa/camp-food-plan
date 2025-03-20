import { FoodRestriction } from "../enums/food-restriction.enum";

interface IIngredient {
  name: string;
  unit: string;
  quantity: number;
  durability: number;
}

interface IProceeding {

  order: number;
  description: string;
}

interface IHistoryOfChanges {

  date: Date;
  changes: string;
}

export interface IRecipeVariant {
  id: number;
  recipeId: number;
  name: string;
  ingredients: IIngredient[];
  proceeding: IProceeding[];
  restrictions: FoodRestriction[];
  historyOfChanges: IHistoryOfChanges[];
}