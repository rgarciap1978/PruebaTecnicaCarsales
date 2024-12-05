import { Whereabouts } from "../model/whereabouts";
import { Paginator } from "../model/paginator";

export class WhereaboutsDTO {
  info: Paginator;
  results: Whereabouts[];
}
