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
    breakpoints: params?.breakpoints ?? new Map<BreakpointTypes, Map<CssPropertyTypes, CssValue>>(),
    toggle: params?.toggle ?? {}
  } as CssGroup;

  for (let breakpointTypesKey in BreakpointTypes) {
    tmp.breakpoints.set(breakpointTypesKey as BreakpointTypes, new Map());
    tmp.toggle[breakpointTypesKey] = false;

    if (breakpointTypesKey === BreakpointTypes.general) {
      tmp.toggle[breakpointTypesKey] = true;
    }
  }

  return tmp;
}

export function createCssGroupExport(cssGroup: CssGroup): CssGroupExport {
  return new CssGroupExport(cssGroup)
}

export function createCssGroupPopulate(cssGroup: CssGroup): CssGroupPopulate {
  return new CssGroupPopulate(cssGroup)
}
