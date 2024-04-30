import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CssGroup} from "@src/models/css-group.model";
import {BreakpointTypes} from "@src/models/breakpoint-types.enum";
import {CssValue} from "@src/models/css-value.model";
import {CssGroupsFacade} from '@src/store/css-groups/css-groups.facade';
import {CssGroupsQuery} from '@src/store/css-groups/css-groups.query';
import {switchMap, take} from 'rxjs/operators';
import {TemplatesService} from '@src/services/templates.service';
import {TypographyPropertiesEnum} from '@src/models/typography-properties.enum';
import {buildCssName, buildTypographyCssName} from '@src/services/helper.service';
import {TypographyEnum} from '@src/models/typography.enum';
import {FirebaseService} from '@src/services/firebase.service';
import {BehaviorSubject} from 'rxjs';
import {UnsubscribeService} from '@src/services/unsubscribe.service';
import {EventService} from '@src/services/event.service';

@Component({
  selector: 'app-css-group',
  templateUrl: './css-group.component.html',
  styleUrls: ['./css-group.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssGroupComponent implements OnInit, OnChanges {
  cssGroupsQuery = inject(CssGroupsQuery);
  protected fbService = inject(FirebaseService);
  protected unService = inject(UnsubscribeService);
  protected cssGroupsFacade = inject(CssGroupsFacade);
  protected templatesService = inject(TemplatesService);

  @Input() cssGroup!: CssGroup;
  @Input() showChildren: boolean = true;
  breakpointTypes = BreakpointTypes;
  toggle: { [key: string]: boolean } = {};
  typography?: string;
  typographyPropertiesEnum = TypographyPropertiesEnum;
  childOppenedMap: Map<string, boolean> = new Map();
  isCopyForAllBreakpoints: boolean = false;
  loading$ = new BehaviorSubject(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cssGroup && this.cssGroup) {
      this.cssGroup = JSON.parse(JSON.stringify(this.cssGroup));

      const fontFamilyProperty = this.cssGroup.bps[BreakpointTypes.general][TypographyPropertiesEnum['font-family']];
      if (fontFamilyProperty) {
        for (const i in TypographyEnum) {
          if (fontFamilyProperty.current.indexOf(i) > -1) {
            this.typography = i;
            break;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    for (let breakpointTypesKey in BreakpointTypes) {
      this.toggle[breakpointTypesKey] = false;

      if (breakpointTypesKey === BreakpointTypes.general) {
        this.toggle[breakpointTypesKey] = true;
      }
    }
  }

  changeTypography(e: any) {
    for (const breakpoint in this.cssGroup.bps) {
      for (const property in this.cssGroup.bps[breakpoint]) {
        if (!(property in TypographyPropertiesEnum)) {
          continue;
        }

        const cssValue = this.cssGroup.bps[breakpoint][property];
        if (e !== 'unset') {
          cssValue.current = 'var(' + buildTypographyCssName(property, e, breakpoint as BreakpointTypes) + ')'
          this.fbService.setSomething(localStorage.getItem('project-name'), `css-groups`, {[cssValue.name]: cssValue.current});
        } else {
          cssValue.current = cssValue.default;
          this.fbService.removeField(localStorage.getItem('project-name'), `css-groups`, cssValue.name);
        }
      }
    }

    this.cssGroup.template = null;
    this.cssGroupsFacade.update(this.cssGroup.name, this.cssGroup);
  }

  onChanged(property: { key: string, value: CssValue }, breakpoint: string) {
    const toSend: Array<{ key: string, value: string }> = [];
    if (this.isCopyForAllBreakpoints && breakpoint === BreakpointTypes.general) {
      for (let bpsKey in this.cssGroup.bps) {
        this.cssGroup.bps[bpsKey][property.key].current = property.value.current;

        const cssName = property.value.name + (bpsKey === BreakpointTypes.general ? '' : '_' + bpsKey);
        this.fbService.setSomething(localStorage.getItem('project-name'), `css-groups`, {[cssName]: property.value.current});
        toSend.push({key: cssName, value: property.value.current})
      }
    } else {
      this.cssGroup.bps[breakpoint][property.key].current = property.value.current;
      this.fbService.setSomething(localStorage.getItem('project-name'), `css-groups`, {[property.value.name]: property.value.current});
      toSend.push({key: property.value.name, value: property.value.current});
    }

    this.cssGroup.template = null;
    this.cssGroupsFacade.update(this.cssGroup.name, this.cssGroup);
  }

  templateSelected(templateName: string | null, cb?: any) {
    if (templateName !== null) {
      this.loading$.next(true)
      this.unService.handle = this.fbService.getSomething(templateName, `css-groups`)
        .pipe(switchMap(res => {
          return this.cssGroupsFacade.cloneTemplate(
            this.cssGroup,
            this.templatesService.templateName$.value,
            new Map(Object.entries(res.data() ?? {})),
            this.showChildren
          )
        })).subscribe(() => {
          this.loading$.next(false);

          if (cb) {
            cb();
          }
        });
    } else {
      this.cssGroupsFacade.cloneTemplate(this.cssGroup, this.templatesService.templateName$.value, new Map(), this.showChildren);
      if (cb) {
        cb();
      }
    }
  }

  childToggle(name: string, toggle: boolean): void {
    if (toggle) {
      this.childOppenedMap.set(name, toggle);
    } else {
      this.childOppenedMap.delete(name);
    }

    this.cssGroupsFacade.update(this.cssGroup.name, {disabled: !!this.childOppenedMap.size});
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }

  unsorted() {
    return 0;
  }
}
