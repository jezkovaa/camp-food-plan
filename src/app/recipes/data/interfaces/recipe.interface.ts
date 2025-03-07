import { Course } from '../enums/courses.enum';
import { RecipeVariant } from './recipe-variant.interface';

export interface Recipe {
  id: number;
  name: string;
  courses: Course[];
  variants: RecipeVariant[];
}

