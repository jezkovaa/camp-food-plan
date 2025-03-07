import { FoodRestriction } from "../enums/food-restriction.enum";

interface Ingredient {
  name: string;
  unit: string;
  quantity: number;
  durability: number;
}

interface Proceeding {

  order: number;
  description: string;
}

interface HistoryOfChanges {

  date: Date;
  changes: string;
}

export interface RecipeVariant {
  id: number;
  recipeId: number;
  name: string;
  ingredients: Ingredient[];
  proceeding: Proceeding[];
  restrictions: FoodRestriction[];
  historyOfChanges: HistoryOfChanges[];
}