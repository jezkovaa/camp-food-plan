import { FoodRestriction } from "src/app/recipes/data/enums/food-restriction.enum";
import { IDayMenu } from "./day-menu.interface";

export interface IPlannedEvent {
  id: string;
  name: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  description?: string;
  participants: IParticipant[];
  menu: IDayMenu[];
}

export interface IParticipant {
  id: string;
  restrictions: FoodRestriction[];
}