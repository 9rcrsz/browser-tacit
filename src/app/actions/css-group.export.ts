import { CssGroup } from "@app/models/css-group.model";

export class CssGroupExport {
  protected model: CssGroup;

  constructor(m: CssGroup) {
    this.model = m;
  }

  export(): Array<string> {
    const variables: Array<string> = [];

    if (this.model.template) {
      variables.push('--template_' + this.model.name + ': ' + this.model.template + ';');
    }

    Object.keys(this.model.bps).forEach(breakpointName => {
      const breakpoint = this.model.bps[breakpointName];

      Object.keys(breakpoint).forEach(property => {
        const cssVal = breakpoint[property];

        if (cssVal.current !== cssVal.default) {
          const name = cssVal.name + ': ' + cssVal.current + ';';
          variables.push(name);
        }
      });
    });

    return variables;
  }
}
