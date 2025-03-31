import { ID } from 'src/app/types';
import { Course } from '../enums/courses.enum';
import { IRecipeVariant } from './recipe-variant.interface';

export interface IRecipe {
  id: ID | null;
  name: string;
  courses: Course[];
  variants: IRecipeVariant[];
}
