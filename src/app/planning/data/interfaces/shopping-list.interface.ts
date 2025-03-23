export interface IShoppingList {
  id: string;
  name: string;
  date: Date;
  items: IShoppingListItem[];
}

export interface IShoppingListItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
}