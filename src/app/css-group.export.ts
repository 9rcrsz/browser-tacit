import {BreakpointTypes, CssGroup} from "./css-group.model";

export class CssGroupExport {
  protected model: CssGroup;

  constructor(m: CssGroup) {
    this.model = m;
  }

  export(): Array<string> {
    const variables = [];

    for (let breakpointTypesKey in BreakpointTypes) {
      const tmpBreakpoint = this.model[breakpointTypesKey as BreakpointTypes]
      for (let i in tmpBreakpoint) {
        if (tmpBreakpoint[i].current !== tmpBreakpoint[i].default) {
          const name = '--' + i + '_' + this.model.name + ': ' + this.model.general[i].current + ';';
          variables.push(name);
        }
      }
    }

    return variables;
  }
}
