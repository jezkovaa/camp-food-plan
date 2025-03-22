import { FoodRestriction } from "src/app/recipes/data/enums/food-restriction.enum";

export interface IPlannedEvent {
  id: string;
  name: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  description?: string;
  participants: IParticipant[];
}

export interface IParticipant {
  id: string;
  restrictions: FoodRestriction[];
}