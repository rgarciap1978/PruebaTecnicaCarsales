import { Episode } from "../model/episode";
import { Paginator } from "../model/paginator";

export class EpisodesDTO {
  info: Paginator;
  results: Episode[];
}
