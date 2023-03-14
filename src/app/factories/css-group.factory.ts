import {BreakpointTypes} from "@app/models/breakpoint-types.enum";
import {CssPropertyTypes} from "@app/models/css-propert-types.enum";
import {CssValue} from "@app/models/css-value.model";
import {CssGroup} from "@app/models/css-group.model";
import {CssGroupExport} from "@app/actions/css-group.export";
import {CssGroupPopulate} from "@app/actions/css-group.populate";

export function createCssGroup(params?: Partial<CssGroup>): CssGroup {
  const tmp = {
    name: params?.name ?? '',
    depth: params?.depth ?? 0,
    bps: params?.bps ?? {}
  } as CssGroup;

  for (let breakpointTypesKey in BreakpointTypes) {
    tmp.bps[breakpointTypesKey]={};
  }

  return tmp;
}

export function createCssGroupExport(cssGroup: CssGroup): CssGroupExport {
  return new CssGroupExport(cssGroup)
}

export function createCssGroupPopulate(cssGroup: CssGroup): CssGroupPopulate {
  return new CssGroupPopulate(cssGroup)
}
