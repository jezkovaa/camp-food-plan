import { ID } from "src/app/types";
import { IDayMenu } from "./day-menu.interface";
import { IParticipant } from "./planned-event.interface";
import { Course } from "../enums/courses.enum";
import { FoodRestriction } from "../enums/food-restriction.enum";

export interface IPlannedEventExtended {
  id: ID;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  description?: string;
  participants: IParticipant[];
  menu: IDayMenuExtended[];
}

export interface IDayMenuExtended {
  id: ID;
  date: Date;
  meals: IDayMealExtended[];
}

export interface IDayMealExtended {
  id?: ID;
  course: Course;
  chosenRecipes: IDayMealRecipeExtended[];
}

export interface IDayMealRecipeExtended {
  recipeId: ID;
  recipeName: string;
  variants: IDayMealRecipeVariantExtended[];
}

export interface IDayMealRecipeVariantExtended {
  variantId: ID;
  variantName: string;
  portions: number;
  restrictions: Set<FoodRestriction>;
}