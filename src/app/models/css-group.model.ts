import { CssValue } from "@app/models/css-value.model";

export interface CssGroup {
  name: string;
  depth: number;
  template: string | null;
  bps: { [breakpoint: string]: { [property: string]: CssValue } };

  disabled: boolean
}
