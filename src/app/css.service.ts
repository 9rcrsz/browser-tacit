import {Injectable} from "@angular/core";
import {BreakpointTypes, CssGroup, CssPropertyTypes} from "./css-group.model";

@Injectable({providedIn: "root"})
export class CssService {
  buildCssGroupsMap(data: { moduleClassName: string, vars: Array<string> }): Map<string, CssGroup> {
    const cssGroups = new Map<string, CssGroup>();

    data.vars.forEach(tmpVar => {
      const preparedVariable = this.parseVariable(tmpVar);
      if (preparedVariable.variableParts[0] !== data.moduleClassName) {
        return;
      }

      const groupName = preparedVariable.variableParts.join('_');
      if (!cssGroups.get(groupName)) {
        cssGroups.set(groupName, new CssGroup());
      }
      cssGroups.get(groupName)!.name = groupName;
      cssGroups.get(groupName)!.depth = preparedVariable.variableParts.length;
      cssGroups.get(groupName)![preparedVariable.breakpoint as BreakpointTypes][preparedVariable.cssProperty as CssPropertyTypes] = '';
    });

    return cssGroups;
  }

  parseVariable(cssVariable: string): { cssProperty: string, variableParts: Array<string>, breakpoint: string } {
    const arrVar = cssVariable.replace('--', '').split('_');
    const cssProperty = arrVar.shift() as string;

    let breakpoint = BreakpointTypes.general;
    switch (arrVar[arrVar.length - 1]) {
      case BreakpointTypes.desktop:
      case BreakpointTypes.laptop:
      case BreakpointTypes.tablet:
      case BreakpointTypes.mobile:
        breakpoint = arrVar.pop() as BreakpointTypes;
        break;
    }

    return {cssProperty, variableParts: arrVar, breakpoint}
  }
}


