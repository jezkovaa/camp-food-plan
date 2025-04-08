import { Course } from "../enums/courses.enum";
import { FilterType } from "../enums/filter-type.enum";
import { FoodRestriction } from "../enums/food-restriction.enum";

export interface IFilter {

  name: string;
  value: Course | FoodRestriction;
  type: FilterType;

}