import { ID } from "src/app/types";

export interface IShoppingList {
  id: ID;
  name: string;
  date: Date;
  items: IShoppingListItem[];
}

export interface IShoppingListItem {
  id: ID;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
}