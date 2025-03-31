import { TranslateService } from "@ngx-translate/core";
import { Course } from "../enums/courses.enum";
import { IRecipeVariant } from "../interfaces/recipe-variant.interface";
import { IRecipe } from "../interfaces/recipe.interface";

export class Recipe implements IRecipe {
  id: string | null;
  name: string;
  courses: Course[];
  variants: IRecipeVariant[];

  constructor() {
    this.id = null;
    this.name = "";
    this.courses = [];
    this.variants = [];
  }

}