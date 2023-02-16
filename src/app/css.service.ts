import {Injectable} from "@angular/core";
import {BreakpointTypes, CssGroup, CssPropertyTypes} from "./css-group.model";

@Injectable({providedIn: "root"})
export class CssService {
  buildCssGroupsMap(data: { moduleClassName: string, vars: Array<string> }): Map<string, CssGroup> {
    const cssGroups = new Map<string, CssGroup>();

    data.vars.forEach(tmpVar => {
      const preparedVariable = this.parseVariable(tmpVar);
      if (!preparedVariable || preparedVariable.variableParts[0] !== data.moduleClassName) {
        return;
      }

      // restore value form the local storage
      const storageProperty = localStorage.getItem(preparedVariable.origin);
      if (storageProperty) {
        if (storageProperty === preparedVariable.value) {
          localStorage.removeItem(preparedVariable.origin);
        } else {
          preparedVariable.value = storageProperty;
        }
      }

      const groupName = preparedVariable.variableParts.join('_');
      if (!cssGroups.get(groupName)) {
        cssGroups.set(groupName, new CssGroup());
      }
      cssGroups.get(groupName)!.name = groupName;
      cssGroups.get(groupName)!.depth = preparedVariable.variableParts.length;
      cssGroups.get(groupName)![preparedVariable.breakpoint as BreakpointTypes][preparedVariable.cssProperty as CssPropertyTypes] = preparedVariable.value;
    });

    console.log(cssGroups)

    return cssGroups;
  }

  parseVariable(cssVariable: string): null |
    { cssProperty: string, variableParts: Array<string>, breakpoint: string, value: string, origin: string } {
    const varAndVal = cssVariable.split(':');
    if (varAndVal.length !== 2) {
      return null;
    }

    const arrVar = varAndVal[0].replace('--', '').split('_');
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

    return {cssProperty, variableParts: arrVar, breakpoint, value: varAndVal[1].trim(), origin: varAndVal[0].trim()}
  }
}


