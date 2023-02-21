export enum BreakpointTypes {
  general = 'general',
  desktop = 'desktop',
  laptop = 'laptop',
  tablet = 'tablet',
  mobile = 'mobile'
}

export enum CssPropertyTypes {
  padding = 'padding',
  margin = 'margin',
  display = 'display',
  color = 'color'
}

export interface CssValue {
  default: string;
  current: string;
  labels?: Array<string>
}

export class CssGroup {
  name = '';
  depth = 0;

  breakpoints = new Map<BreakpointTypes, Map<CssPropertyTypes, CssValue>>();
  toggle: { [key: string]: boolean } = {}

  constructor() {
    for (let breakpointTypesKey in BreakpointTypes) {
      this.breakpoints.set(breakpointTypesKey as BreakpointTypes, new Map());
      this.toggle[breakpointTypesKey] = false;

      if (breakpointTypesKey === BreakpointTypes.general) {
        this.toggle[breakpointTypesKey] = true;
      }
    }
  }
}
