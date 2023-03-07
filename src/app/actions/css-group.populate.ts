import {CssGroup} from "@app/models/css-group.model";

export class CssGroupPopulate {
  protected model: CssGroup;

  constructor(m: CssGroup) {
    this.model = m;
  }

  populate(template: Map<string, string>) {
    this.model.breakpoints.forEach(breakpoint => {
      breakpoint.forEach(cssValue => {
        const templateValue = template.get(cssValue.name);
        if (templateValue !== undefined) {
          cssValue.current = templateValue;
          localStorage.setItem(cssValue.name, cssValue.current);
        }
      })
    });
  }
}
