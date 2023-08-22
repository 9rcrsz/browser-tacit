import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { Colors } from "@app/models/colors.model";
import { CssGroup } from "@app/models/css-group.model";
import { TemplatesService } from "@app/services/templates.service";
import { createColors, createColorsExport } from "@app/factories/colors.factory";
import { CssGroupsQuery } from "@app/store/state/css-groups.query";
import { CssGroupsService } from '@app/store/state/css-groups.service';
import { ChromeService } from '@app/services/chrome.service';
import { ColorsService } from './store/state/colors.service';
import { TypographyService } from './store/state/typography.service';
import { TypographyQuery } from './store/state/typography.query';
import { Typography } from './models/typography.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'browser-tacit';
  templateName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    protected cssGroupsService: CssGroupsService,
    protected typographyService: TypographyService,
    protected colorsService: ColorsService,
    public cssGroupsQuery: CssGroupsQuery) {
  }

  ngOnInit() {

  }

  templateSelected(templateName: string | null) {
    this.templateName$.next(templateName);
    localStorage.clear();

    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.colorsService.setTemplate(templateName, data);
          this.cssGroupsService.setTemplate(templateName, data);
          this.typographyService.setTemplate(templateName, data);
          // this.typographyService

          this.chromeService.send({ type: 'remove-variables' });

          const variables = [
            ...this.cssGroupsService.export(),
            ...this.colorsService.export(),
            ...this.typographyService.export()
          ];
          this.chromeService.send({ type: 'set-variables', variables })
        });
    } else {
      this.cssGroupsService.setTemplate(null, new Map());
      this.colorsService.setTemplate(null, new Map());
      this.typographyService.setTemplate(null, new Map());
      this.chromeService.send({ type: 'remove-variables' });
    }
  }

  sync() {
    this.cssGroupsService.get();
    // this.chromeService.send({ type: 'get-variables' })

    // this.chromeService.send({ type: 'remove-variables' });
    //
    // const variables = [
    //   ...this.cssGroupsService.export(),
    //   ...this.colorsService.export(),
    //   ...this.typographyService.export()
    // ];
    // this.chromeService.send({ type: 'set-variables', variables })
  }

  export() {
    const variables = [
      ...this.cssGroupsService.export(),
      ...this.colorsService.export(),
      ...this.typographyService.export()
    ];

    navigator.clipboard.writeText(variables.join("\r\n")).then(function () {
      alert('Copied to clipboard.');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  reset() {
    this.templateName$.next(null);
    localStorage.clear();
    this.cssGroupsService.reset();
    this.colorsService.reset();
    this.typographyService.reset();
    this.chromeService.send({ type: 'remove-variables' });
  }

  trackByName(index: number, cssGroup: CssGroup | Typography) {
    return cssGroup.name;
  }
}
