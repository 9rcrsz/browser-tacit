import { BreakpointTypes } from "@src/models/breakpoint-types.enum";
import { Typography } from "@src/models/typography.model";
import { buildTypographyCssName } from "@src/services/helper.service";

export class TypographyExport {
  protected model: Typography;

  constructor(m: Typography) {
    this.model = m;
  }

  export(): Array<string> {
    const variables: Array<string> = [];

    console.log(this.model.template)
    if (this.model.template) {
      variables.push('--template_' + this.model.name + ': ' + this.model.template + ';');
    }

    Object.keys(this.model.bps).forEach(breakpointName => {
      const breakpoint = this.model.bps[breakpointName];

      Object.keys(breakpoint).forEach(property => {
        const cssName = buildTypographyCssName(property, this.model.name, breakpointName as BreakpointTypes);
        const cssVal = breakpoint[property];

        if (cssVal) {
          variables.push(cssName + ': ' + cssVal + ';');
        }
      });
    });

    return variables;
  }
}
