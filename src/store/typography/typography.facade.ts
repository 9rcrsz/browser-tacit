import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {createTypographyExport} from '@src/factories/typography.factory';
import {BreakpointTypes} from '@src/models/breakpoint-types.enum';
import {Typography} from '@src/models/typography.model';
import {buildTypographyCssName} from '@src/services/helper.service';
import {ID} from '@datorama/akita';
import {tap} from 'rxjs/operators';
import {TypographyStore} from './typography.store';
import {FirebaseService} from '@src/services/firebase.service';

@Injectable({providedIn: 'root'})
export class TypographyFacade {
  protected fbService = inject(FirebaseService);

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

  setProject(data: Map<string, string>) {
    const typographyGroups: Array<Typography> = Object.values(JSON.parse(JSON.stringify(this.typographyStore.getValue().entities)));
    typographyGroups.forEach((typography: Typography) => {
      for (const breakpoint in typography.bps) {
        for (const property in typography.bps[breakpoint]) {
          const cssName = buildTypographyCssName(property, typography.name, breakpoint as BreakpointTypes);

          if (data.has(cssName)) {
            typography.bps[breakpoint][property] = data.get(cssName)!;
          } else {
            typography.bps[breakpoint][property] = '';
          }
        }
      }
    });

    this.typographyStore.set(typographyGroups);
  }

  cloneTemplate(typography: Typography, templateName: string | null, data: Map<string, string>) {
    const fieldsToSave: { [key: string]: string } = {};
    const fieldsToRemove: Array<string> = [];

    for (const breakpoint in typography.bps) {
      for (const property in typography.bps[breakpoint]) {
        const cssName = buildTypographyCssName(property, typography.name, breakpoint as BreakpointTypes);
        if (data.has(cssName)) {
          typography.bps[breakpoint][property] = data.get(cssName)!;
          fieldsToSave[cssName] = typography.bps[breakpoint][property];
        } else {
          typography.bps[breakpoint][property] = '';
          fieldsToRemove.push(cssName);
        }
      }
    }

    this.fbService.setSomething(templateName, `typography`, fieldsToSave);
    this.fbService.removeFields(templateName, `css-groups`, fieldsToRemove);
    this.typographyStore.update(typography.name, typography);
  }

}
