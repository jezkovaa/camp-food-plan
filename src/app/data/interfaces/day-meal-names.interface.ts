import { ID } from "src/app/types";

export interface IDayMealVariantNames {
  variantId: ID,
  variantName: string;
};

export interface IDayMealRecipeNames {
  id: ID,
  name: string;
  variants: IDayMealVariantNames[];
};