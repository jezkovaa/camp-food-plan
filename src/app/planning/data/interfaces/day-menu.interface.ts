import { Course } from "src/app/recipes/data/enums/courses.enum";

export interface IDayMenu {
  id: string;
  date: Date;
  meals: IDayMeal[];
}

export interface IDayMeal {
  id: string;
  course: Course;
  chosenRecipes: [
    {
      recipeId: string;
      variants: [
        {
          variantId: string;
          portions: number;
        }
      ];
    }
  ];
}

