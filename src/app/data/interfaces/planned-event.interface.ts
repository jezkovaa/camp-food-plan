import { FoodRestriction } from "src/app/data/enums/food-restriction.enum";
import { IDayMenu } from "./day-menu.interface";
import { ID } from "src/app/types";

export interface IPlannedEvent {
  id: ID;
  name: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  description?: string;
  participants: IParticipant[];
  menu: IDayMenu[];
}

export interface IParticipant {
  id: ID;
  restrictions: FoodRestriction[];
}