import { Course } from "src/app/recipes/data/enums/courses.enum";
import { ID } from "src/app/types";

export interface IDayMenu {
  id: ID;
  date: Date;
  meals: IDayMeal[];
}

export interface IDayMeal {
  id: ID;
  course: Course;
  chosenRecipes: [
    {
      recipeId: ID;
      variants: [
        {
          variantId: ID;
          portions: number;
        }
      ];
    }
  ];
}

