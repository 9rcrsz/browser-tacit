import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createTypographyExport } from '@src/factories/typography.factory';
import { BreakpointTypes } from '@src/models/breakpoint-types.enum';
import { Typography } from '@src/models/typography.model';
import { buildTypographyCssName } from '@src/services/helper.service';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { TypographyStore } from './typography.store';

@Injectable({ providedIn: 'root' })
export class TypographyService {

  constructor(private typographyStore: TypographyStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Typography[]>('https://api.com').pipe(tap(entities => {
      this.typographyStore.set(entities);
    }));
  }

  add(typography: Typography) {
    this.typographyStore.add(typography);
  }

  update(id: string, cssGroup: Partial<Typography>) {
    this.typographyStore.update(id, cssGroup);
  }

  remove(id: ID) {
    this.typographyStore.remove(id);
  }

  reset() {
    const typographyGroups: Array<Typography> = Object.values(JSON.parse(JSON.stringify(this.typographyStore.getValue().entities)));
    typographyGroups.forEach((typography: Typography) => {
      typography.template = null;

      for (const breakpoint in typography.bps) {
        for (const property in typography.bps[breakpoint]) {
          typography.bps[breakpoint][property] = '';
        }
      }
    });

    this.typographyStore.set(typographyGroups);
  }

  export(): Array<string> {
    let variables: Array<string> = [];
    Object.values(this.typographyStore.getValue().entities ?? {}).forEach(typography => {
      variables = [...variables, ...createTypographyExport(typography).export()]
    });

    return variables;
  }

  setTemplate(templateName: string | null, data: Map<string, string>) {
    const typographyGroups: Array<Typography> = Object.values(JSON.parse(JSON.stringify(this.typographyStore.getValue().entities)));
    typographyGroups.forEach((typography: Typography) => {
      let realTemplateName = templateName;
      if (templateName && data.has('--template_' + typography.name)) {
        realTemplateName = data.get('--template_' + typography.name)!;
      }

      typography.template = realTemplateName;
      if (realTemplateName) {
        localStorage.setItem('--template_' + typography.name, realTemplateName);
      } else {
        localStorage.removeItem('--template_' + typography.name);
      }

      for (const breakpoint in typography.bps) {
        for (const property in typography.bps[breakpoint]) {
          const cssName = buildTypographyCssName(property, typography.name, breakpoint as BreakpointTypes);

          if (data.has(cssName)) {
            typography.bps[breakpoint][property] = data.get(cssName)!;
            localStorage.setItem(cssName, typography.bps[breakpoint][property]);
          } else {
            typography.bps[breakpoint][property] = '';
            localStorage.removeItem(cssName);
          }
        }
      }
    });

    this.typographyStore.set(typographyGroups);
  }

  setCascadeTemplate(typography: Typography, templateName: string | null, data: Map<string, string>) {
    let realTemplateName = templateName;
    if (templateName && data.has('--template_' + typography.name)) {
      realTemplateName = data.get('--template_' + typography.name)!;
    }

    typography.template = realTemplateName;
    if (realTemplateName) {
      localStorage.setItem('--template_' + typography.name, realTemplateName);
    } else {
      localStorage.removeItem('--template_' + typography.name);
    }

    for (const breakpoint in typography.bps) {
      for (const property in typography.bps[breakpoint]) {
        const cssValue = typography.bps[breakpoint][property];

        const cssName = buildTypographyCssName(property, typography.name, breakpoint as BreakpointTypes);
        if (data.has(cssName)) {
          typography.bps[breakpoint][property] = data.get(cssName)!;
          localStorage.setItem(cssName, typography.bps[breakpoint][property]);
        } else {
          typography.bps[breakpoint][property] = '';
          localStorage.removeItem(cssName);
        }
      }
    }

    this.typographyStore.update(typography.name, typography);
  }

}
