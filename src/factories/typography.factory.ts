import {TypographyExport} from "@src/app/actions/typography.export";
import {BreakpointTypes} from "@src/models/breakpoint-types.enum";
import {TypographyPropertiesEnum} from "@src/models/typography-properties.enum";
import {Typography} from "@src/models/typography.model";
import {buildTypographyCssName} from "@src/services/helper.service";

export function createTypography(params: Partial<Typography>) {
  const tmp: Typography = {
    name: params.name ?? '',
    template: params.template ?? null,
    bps: {}
  };

  for (const type in BreakpointTypes) {
    tmp.bps[type] = {};

    for (const property in TypographyPropertiesEnum) {
      const cssName = buildTypographyCssName(property, tmp.name, type as BreakpointTypes);
      tmp.bps[type][property] = '';
    }
  }

  return tmp as Typography;
}

export function createTypographyExport(typography: Typography): TypographyExport {
  return new TypographyExport(typography)
}
