import {BreakpointTypes} from "@src/models/breakpoint-types.enum";
import {CssGroup} from "@src/models/css-group.model";
import {CssGroupExport} from "@src/app/actions/css-group.export";
import {CssGroupPopulate} from "@src/app/actions/css-group.populate";

export function createCssGroup(params?: Partial<CssGroup>): CssGroup {
  const tmp = {
    name: params?.name ?? '',
    depth: params?.depth ?? 0,
    disabled: params?.disabled ?? false,
    bps: params?.bps ?? {}
  } as CssGroup;

  for (let breakpointTypesKey in BreakpointTypes) {
    tmp.bps[breakpointTypesKey] = {};
  }

  return tmp;
}

export function createCssGroupExport(cssGroup: CssGroup): CssGroupExport {
  return new CssGroupExport(cssGroup)
}

export function createCssGroupPopulate(cssGroup: CssGroup): CssGroupPopulate {
  return new CssGroupPopulate(cssGroup)
}
