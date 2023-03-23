import { Injectable } from "@angular/core";
import { CssGroup } from "@app/models/css-group.model";
import { createCssGroup } from "@app/factories/css-group.factory";
import { BreakpointTypes } from "@app/models/breakpoint-types.enum";
import { CssPropertyTypes } from "@app/models/css-propert-types.enum";
import { TemplatesEnum } from "@app/models/templates.enum";

@Injectable({ providedIn: "root" })
export class CssService {
  buildCssGroupsMap(data: { moduleClassName: string, vars: Array<string> }): Map<string, CssGroup> {
    const cssGroups = new Map<string, CssGroup>();

    data.vars.forEach(tmpVar => {
      const preparedVariable = this.parseVariable(tmpVar);
      if (!preparedVariable || preparedVariable.variableParts[0] !== data.moduleClassName) {
        return;
      }
      // console.log(preparedVariable)

      // restore value form the local storage
      const storageProperty = localStorage.getItem(preparedVariable.origin);
      let currentValue = preparedVariable.value;
      if (storageProperty) {
        if (storageProperty === preparedVariable.value) {
          localStorage.removeItem(preparedVariable.origin);
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
        default: preparedVariable.value,
        current: currentValue,
        labels: preparedVariable.labels,
        name: tmpVar.split(':')[0].trim()
      }
    });

    console.log(cssGroups)

    return cssGroups;
  }

  parseVariable(cssVariable: string): null |
  {
    cssProperty: string,
    variableParts: Array<string>,
    breakpoint: string,
    labels: Array<string>,
    value: string,
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

    const varAndVal: Array<string> = cssVariable.split(':');
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

    return {
      cssProperty,
      variableParts: arrVar,
      breakpoint,
      labels,
      value: varAndVal[1].trim(),
      origin: varAndVal[0].trim()
    }
  }
}


