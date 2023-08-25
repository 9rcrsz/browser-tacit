import { Injectable } from "@angular/core";
import { CssGroup } from "@src/models/css-group.model";
import { createCssGroup } from "@src/factories/css-group.factory";
import { BreakpointTypes } from "@src/models/breakpoint-types.enum";
import { TemplatesEnum } from "@src/models/templates.enum";

@Injectable({ providedIn: "root" })
export class CssService {
  buildCssGroupsMap(data: { moduleClassName?: string, vars: Array<string> }): Map<string, CssGroup> {
    const cssGroups = new Map<string, CssGroup>();

    data.vars.forEach(tmpVar => {
      const splittedVarAndVal = this.splitVarAndValue(tmpVar);
      const preparedVariable = !!splittedVarAndVal ? this.parseVariable(splittedVarAndVal[0]) : null;
      if (!preparedVariable /*|| preparedVariable.variableParts[0] !== data.moduleClassName*/) {
        return;
      }

      // restore value form the local storage
      const storageProperty = localStorage.getItem(splittedVarAndVal![0]);
      let currentValue = splittedVarAndVal![1];
      if (storageProperty) {
        if (storageProperty === splittedVarAndVal![1]) {
          localStorage.removeItem(splittedVarAndVal![0]);
        } else {
          currentValue = storageProperty;
        }
      }

      const groupName = preparedVariable.variableParts.join('_');
      if (!cssGroups.get(groupName)) {
        cssGroups.set(groupName, createCssGroup());
      }

      const cssGroup = cssGroups.get(groupName);
      cssGroup!.name = groupName;
      cssGroup!.template = localStorage.getItem('--template_' + groupName) ?? null;
      cssGroup!.depth = preparedVariable.variableParts.length;

      cssGroup!.bps[preparedVariable.breakpoint][preparedVariable.cssProperty] = {
        default: splittedVarAndVal![1],
        current: currentValue,
        labels: preparedVariable.labels,
        name: tmpVar.split(':')[0].trim()
      }
    });

    // console.log(cssGroups)

    return cssGroups;
  }

  splitVarAndValue(cssVariable: string): Array<string> | null {
    const varAndVal: Array<string> = cssVariable.split(':');
    if (varAndVal.length !== 2) {
      return null;
    }

    return [varAndVal[0].trim(), varAndVal[1].trim()];
  }


  parseVariable(cssVariable: string): null |
  {
    cssProperty: string,
    variableParts: Array<string>,
    breakpoint: string,
    labels: Array<string>,
    origin: string
  } {
    const labels = [];
    for (let templatesEnumKey in TemplatesEnum) {
      const tmp = cssVariable.replace('_' + templatesEnumKey + '_', '_');
      if (tmp.length !== cssVariable.length) {
        cssVariable = tmp;
        labels.push(templatesEnumKey);
      }
    }

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

    return {
      cssProperty,
      variableParts: arrVar,
      breakpoint,
      labels,
      origin: cssVariable
    }
  }
}


