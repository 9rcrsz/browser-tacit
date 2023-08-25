import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CssGroup} from "@src/models/css-group.model";
import {BreakpointTypes} from "@src/models/breakpoint-types.enum";
import {CssGroupsQuery} from '@src/store/css-groups/css-groups.query';
import {ChromeService} from '@src/services/chrome.service';
import {take} from 'rxjs/operators';
import {TemplatesService} from '@src/services/templates.service';
import {TypographyFacade} from '@src/store/typography/typography.facade';
import {buildTypographyCssName} from '@src/services/helper.service';
import {Typography} from '@src/models/typography.model';

@Component({
  selector: 'app-typography-group',
  templateUrl: './typography-group.component.html',
  styleUrls: ['./typography-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyGroupComponent implements OnInit, OnChanges {
  @Input() typography!: Typography;
  breakpointTypes = BreakpointTypes;
  isCopyForAllBreakpoints: boolean = false;
  toggle: { [key: string]: boolean } = {};

  constructor(
    protected typographyFacade: TypographyFacade,
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    public cssGroupsQuery: CssGroupsQuery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.typography && this.typography) {
      this.typography = JSON.parse(JSON.stringify(this.typography));
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

  onChanged(property: { key: string, value: string }, breakpoint: BreakpointTypes) {
    const toSend: Array<{ key: string, value: string }> = [];
    if (this.isCopyForAllBreakpoints && breakpoint === BreakpointTypes.general) {
      for (let bpsKey in this.typography.bps) {
        this.typography.bps[bpsKey][property.key] = property.value;

        const cssName = buildTypographyCssName(property.key, this.typography.name, bpsKey as BreakpointTypes);
        localStorage.setItem(cssName, property.value);
        toSend.push({key: cssName, value: property.value})
      }
    } else {
      this.typography.bps[breakpoint][property.key] = property.value;

      const cssName = buildTypographyCssName(property.key, this.typography.name, breakpoint);
      localStorage.setItem(cssName, property.value);
      toSend.push({key: cssName, value: property.value})
    }

    this.typography.template = null;
    this.typographyFacade.update(this.typography.name, this.typography);

    this.chromeService.send({type: 'set-variables', variables: toSend});
  }

  templateSelected(templateName: string | null) {
    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.typographyFacade.setCascadeTemplate(this.typography, templateName, data);
        });
    } else {
      this.typographyFacade.setCascadeTemplate(this.typography, null, new Map());
    }
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }

  unsorted() {
    return 0;
  }
}
