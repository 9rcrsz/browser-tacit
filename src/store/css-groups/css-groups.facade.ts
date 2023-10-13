import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {CssGroupsStore} from './css-groups.store';
import {CssGroup} from "@src/models/css-group.model";
import {CssService} from '@src/services/css.service';
import {createCssGroupExport} from '@src/factories/css-group.factory';
import {TemplatesEnum} from "@src/models/templates.enum";
import {BreakpointTypes} from "@src/models/breakpoint-types.enum";
import {map, switchMap, take} from "rxjs/operators";
import {FirebaseService} from '@src/services/firebase.service';
import {CssGroupsQuery} from '@src/store/css-groups/css-groups.query';
import {forkJoin, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CssGroupsFacade {
  protected fbService = inject(FirebaseService);
  protected cssGroupsQuery = inject(CssGroupsQuery);

  constructor(
    private cssGroupsStore: CssGroupsStore,
    protected cssService: CssService,
    protected http: HttpClient) {
  }

  get() {
    return this.http.get('/assets/all.json')
      .pipe(
        map((all: any) => {
          const tmp = this.cssService.buildCssGroupsMap({vars: all});
          this.cssGroupsStore.set([...tmp.values()]);
        })
      );
  }

  add(cssGroup: CssGroup) {
    this.cssGroupsStore.add(cssGroup);
  }

  update(id: string, cssGroup: Partial<CssGroup>) {
    this.cssGroupsStore.update(id, cssGroup);
  }

  remove(id: string) {
    this.cssGroupsStore.remove(id);
  }

  reset() {
    const cssGroups: Array<CssGroup> = Object.values(JSON.parse(JSON.stringify(this.cssGroupsStore.getValue().entities)));
    cssGroups.forEach((cssGroup: CssGroup) => {
      cssGroup.template = null;

      for (const breakpoint in cssGroup.bps) {
        for (const property in cssGroup.bps[breakpoint]) {
          const cssValue = cssGroup.bps[breakpoint][property];
          cssValue.current = cssValue.default;
        }
      }
    });

    this.cssGroupsStore.set(cssGroups);
  }

  export(): Array<string> {
    let variables: Array<string> = [];
    Object.values(this.cssGroupsStore.getValue().entities ?? {}).forEach(cssGroup => {
      variables = [...variables, ...createCssGroupExport(cssGroup).export()]
    });

    return variables;
  }

  setProject(data: Map<string, string>) {
    const cssGroups: Array<CssGroup> = Object.values(JSON.parse(JSON.stringify(this.cssGroupsStore.getValue().entities)));
    cssGroups.forEach((cssGroup: CssGroup) => {
      for (const breakpoint in cssGroup.bps) {
        for (const property in cssGroup.bps[breakpoint]) {
          const cssValue = cssGroup.bps[breakpoint][property];

          cssValue.current = cssValue.default;
          if (data.has(cssValue.name)) {
            cssValue.current = data.get(cssValue.name)!;
          }
        }
      }
    });

    this.cssGroupsStore.set(cssGroups);
  }

  cloneTemplate(cssGroup: CssGroup, templateName: string | null, data: Map<string, string>) {
    const fieldsToSave: { [key: string]: string } = {};
    const fieldsToRemove: Array<string> = [];

    for (const breakpoint in cssGroup.bps) {
      for (const property in cssGroup.bps[breakpoint]) {
        const cssValue = cssGroup.bps[breakpoint][property];

        cssValue.current = cssValue.default;
        if (data.has(cssValue.name)) {
          cssValue.current = data.get(cssValue.name)!;
          fieldsToSave[cssValue.name] = cssValue.current;
        } else {
          cssValue.current = cssValue.default;
          fieldsToRemove.push(cssValue.name);
        }
      }
    }
    
    this.cssGroupsStore.update(cssGroup.name, cssGroup);
    return forkJoin([
      this.fbService.setSomething(templateName, `css-groups`, fieldsToSave),
      this.fbService.removeFields(templateName, `css-groups`, fieldsToRemove)
    ]).pipe(
      switchMap(() => {
        return this.cssGroupsQuery.getLevel$(cssGroup.depth + 1, cssGroup.name).pipe(take(1));
      }),
      switchMap(groups => {
        if (!Array.isArray(groups) || !groups.length) {
          return of(null);
        }

        const tmp: Array<Observable<any>> = [];
        groups.forEach(cssGroup => {
          console.log('Updating: ', cssGroup.name)
          tmp.push(this.cloneTemplate(JSON.parse(JSON.stringify(cssGroup)), templateName, data));
        })

        return forkJoin(tmp);
      })
    );
  }
}
