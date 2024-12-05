import { Character } from "../model/character";
import { Paginator } from "../model/paginator";

export class CharactersDTO {
  info: Paginator;
  results: Character[];
}
