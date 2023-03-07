import {CssValue} from "@app/models/css-value.model";
import {BreakpointTypes} from "@app/models/breakpoint-types.enum";
import {CssPropertyTypes} from "@app/models/css-propert-types.enum";

export interface CssGroup {
  name: string;
  depth: number;
  template: string | null;
  breakpoints: Map<BreakpointTypes, Map<CssPropertyTypes, CssValue>>;
  toggle: { [key: string]: boolean };
}
