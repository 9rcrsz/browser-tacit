import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CssGroupsStore} from '@app/store/state/css-groups.store';
import {CssGroup} from "@app/models/css-group.model";
import {CssService} from '@app/services/css.service';
import {createCssGroupExport} from '@app/factories/css-group.factory';
import {TemplatesEnum} from "@app/models/templates.enum";
import {BreakpointTypes} from "@app/models/breakpoint-types.enum";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CssGroupsService {

  constructor(
    private cssGroupsStore: CssGroupsStore,
    protected cssService: CssService,
    protected http: HttpClient) {
  }

  get() {
    this.http.get('/assets/all.json')
      .subscribe((all: any) => {
        const tmp = this.cssService.buildCssGroupsMap({vars: all});
        this.cssGroupsStore.set([...tmp.values()]);
      });
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

  setTemplate(templateName: string | null, data: Map<string, string>) {
    const cssGroups: Array<CssGroup> = Object.values(JSON.parse(JSON.stringify(this.cssGroupsStore.getValue().entities)));
    cssGroups.forEach((cssGroup: CssGroup) => {
      let realTemplateName = templateName;
      if (templateName && data.has('--template_' + cssGroup.name)) {
        realTemplateName = data.get('--template_' + cssGroup.name)!;
      }

      cssGroup.template = realTemplateName;
      if (realTemplateName) {
        localStorage.setItem('--template_' + cssGroup.name, realTemplateName);
      } else {
        localStorage.removeItem('--template_' + cssGroup.name);
      }

      for (const breakpoint in cssGroup.bps) {
        for (const property in cssGroup.bps[breakpoint]) {
          const cssValue = cssGroup.bps[breakpoint][property];

          cssValue.current = cssValue.default;
          if (data.has(cssValue.name)) {
            cssValue.current = data.get(cssValue.name)!;
            localStorage.setItem(cssValue.name, cssValue.current);
          }
        }
      }
    });

    this.cssGroupsStore.set(cssGroups);
  }

  setCascadeTemplate(cssGroup: CssGroup, templateName: string | null, data: Map<string, string>) {
    let realTemplateName = templateName;
    if (templateName && data.has('--template_' + cssGroup.name)) {
      realTemplateName = data.get('--template_' + cssGroup.name)!;
    }

    cssGroup.template = realTemplateName;
    if (realTemplateName) {
      localStorage.setItem('--template_' + cssGroup.name, realTemplateName);
    } else {
      localStorage.removeItem('--template_' + cssGroup.name);
    }

    for (const breakpoint in cssGroup.bps) {
      for (const property in cssGroup.bps[breakpoint]) {
        const cssValue = cssGroup.bps[breakpoint][property];

        cssValue.current = cssValue.default;
        if (data.has(cssValue.name)) {
          cssValue.current = data.get(cssValue.name)!;
          localStorage.setItem(cssValue.name, cssValue.current);
        }
      }
    }

    this.cssGroupsStore.update(cssGroup.name, cssGroup);
  }

}
