import { FoodRestriction } from "src/app/recipes/data/enums/food-restriction.enum";

export interface PlannedEvent {
  id: string;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  description?: string;
  participants: Participant[];
}

export interface Participant {
  id: string;
  restrictions: FoodRestriction[];
}