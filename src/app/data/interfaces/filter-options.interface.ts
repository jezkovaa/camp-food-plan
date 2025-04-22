import { Course } from "../enums/courses.enum";
import { FoodRestriction } from "../enums/food-restriction.enum";

export interface IFilterOptions {
  courses: Set<Course>;
  restrictions: Set<FoodRestriction>;


}