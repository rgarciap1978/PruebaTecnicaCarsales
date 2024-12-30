import { Paginator } from "../model/paginator";
import { BaseDTO } from "./baseDTO";

export class CollectionGenericDTO<T> extends BaseDTO {
  info: Paginator;
  results: T[];
}
