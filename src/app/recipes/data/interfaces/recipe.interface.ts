import { Course } from '../enums/courses.enum';
import { IRecipeVariant } from './recipe-variant.interface';

export interface IRecipe {
  id: number | null;
  name: string;
  courses: Course[];
  variants: IRecipeVariant[];
}
