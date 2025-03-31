import { ID } from "src/app/types";
import { IDayMenu } from "../interfaces/day-menu.interface";
import { IPlannedEvent, IParticipant } from "../interfaces/planned-event.interface";

export class PlannedEvent implements IPlannedEvent {
  id: ID = "";
  name: string = "";
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  description?: string;
  participants: IParticipant[] = [];
  menu: IDayMenu[] = [];

}
