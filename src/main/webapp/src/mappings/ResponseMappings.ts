import {PageStatus} from "../utils/PageStatus";
import {PageResponse} from "../utils/PageResponse";

export class ResponseMappings {
  static ToPageStatus(page: PageResponse<any>) : PageStatus {
    return {
      last: page.last,
      totalPages: page.totalPages,
      totalElements: page.totalElements,
      size: page.size,
      numberOfElements: page.numberOfElements,
      number: page.number,
      first: page.first,
      empty: page.empty
    };
  }
}