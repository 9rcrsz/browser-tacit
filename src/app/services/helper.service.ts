import {BreakpointTypes} from "@app/models/breakpoint-types.enum";

export class HelperService {
  static buildName(property: string, name: string, breakpoint: BreakpointTypes): string {
    return '--' + property + '_' + name + (breakpoint === 'general' || breakpoint === null ? '' : '_' + breakpoint);
  }
}


