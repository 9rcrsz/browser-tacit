import {CssGroup, CssPropertyTypes, CssValue} from "./css-group.model";
import {HelperService} from "./helper.service";

export class CssGroupExport {
  protected model: CssGroup;

  constructor(m: CssGroup) {
    this.model = m;
  }

  export(): Array<string> {
    const variables: Array<string> = [];

    this.model.breakpoints.forEach((breakpoint, breakpointName) => {
      breakpoint.forEach((cssVal: CssValue, prop: CssPropertyTypes) => {
        if (cssVal.current !== cssVal.default) {
          const name = HelperService.buildName(prop, this.model.name, breakpointName);
          variables.push(name);
        }
      })
    });

    return variables;
  }
}
