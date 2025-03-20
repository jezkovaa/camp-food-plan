import { TranslateService } from "@ngx-translate/core";
import { Course } from "../enums/courses.enum";
import { IRecipeVariant } from "../interfaces/recipe-variant.interface";
import { IRecipe } from "../interfaces/recipe.interface";

export class Recipe implements IRecipe {
  id: number | null;
  name: string;
  courses: Course[];
  variants: IRecipeVariant[];

  constructor(name: string) {
    this.id = null;
    this.name = name;
    this.courses = [];
    this.variants = [];
  }

}