import { Course } from "src/app/data/enums/courses.enum";
import { ID } from "src/app/types";

export interface IDayMenu {
  id: ID;
  date: Date;
  meals: IDayMeal[];
}

export interface IDayMeal {
  id?: ID;
  course: Course;
  chosenRecipes: IDayMealRecipe[];

}

export interface IDayMealRecipe {
  recipeId: ID;
  variants: IDayMealRecipeVariant[];
}

export interface IDayMealRecipeVariant {
  variantId: ID;
  portions: number;
}

