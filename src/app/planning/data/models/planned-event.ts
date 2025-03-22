import { IPlannedEvent, IParticipant } from "../interfaces/planned-event.interface";

export class PlannedEvent implements IPlannedEvent {
  id: string = "";
  name: string = "";
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  description?: string;
  participants: IParticipant[] = [];

}
