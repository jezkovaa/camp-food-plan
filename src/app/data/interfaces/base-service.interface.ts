import { Observable } from "rxjs";
import { ID } from "src/app/types";

export interface IBaseService<T> {

  getById(id: ID): Observable<T | null>;

  saveItem(item: T): Observable<T>;

  deleteById(id: ID): Observable<T[]>;



}
