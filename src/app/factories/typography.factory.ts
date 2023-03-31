import { TypographyExport } from "@app/actions/typography.export";
import { BreakpointTypes } from "@app/models/breakpoint-types.enum";
import { TypographyPropertiesEnum } from "@app/models/typography-properties.enum";
import { Typography } from "@app/models/typography.model";
import { buildTypographyCssName } from "@app/services/helper.service";

export function createTypography(params: Partial<Typography>) {
    const tmp: Typography = {
        name: params.name ?? '',
        template: params.template ??  localStorage.getItem('--template_' + params.name) ?? null,
        bps: {}
    };

    for (const type in BreakpointTypes) {
        tmp.bps[type] = {};

        for (const property in TypographyPropertiesEnum) {
            const cssName = buildTypographyCssName(property, tmp.name, type as BreakpointTypes);
            tmp.bps[type][property] = localStorage.getItem(cssName) ?? '';
        }
    }

    return tmp as Typography;
}

export function createTypographyExport(typography: Typography): TypographyExport {
    return new TypographyExport(typography)
  }