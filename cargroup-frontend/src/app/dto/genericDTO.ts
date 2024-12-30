import { BaseDTO } from "./baseDTO";

export class GenericDTO<T> extends BaseDTO {
  results: T
}
