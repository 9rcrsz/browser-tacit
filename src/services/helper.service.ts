import { BreakpointTypes } from "@src/models/breakpoint-types.enum";

export class HelperService {
  static buildName(property: string, name: string, breakpoint: BreakpointTypes): string {
    return '--' + property + '_' + name + (breakpoint === 'general' || breakpoint === null ? '' : '_' + breakpoint);
  }
}

export function buildTypographyCssName(property: string, name: string, breakpoint: BreakpointTypes): string {
  return '--typography-' + property + '_' + name + (breakpoint === 'general' || breakpoint === null ? '' : '_' + breakpoint);
}


