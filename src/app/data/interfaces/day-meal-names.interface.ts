import { ID } from "src/app/types";
import { FoodRestriction } from "../enums/food-restriction.enum";

export interface IDayMealVariantNames {
  variantId: ID,
  variantName: string;
  variantRestrictions: FoodRestriction[];
};

export interface IDayMealRecipeNames {
  id: ID,
  name: string;
  variants: IDayMealVariantNames[];
};