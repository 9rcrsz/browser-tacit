import {BreakpointTypes} from "../css-group.model";

export class HelperService {
  static buildName(property: string, name: string, breakpoint: BreakpointTypes): string {
    return '--' + property + '_' + name + (breakpoint === 'general' || breakpoint === null ? '' : '_' + breakpoint);
  }
}


