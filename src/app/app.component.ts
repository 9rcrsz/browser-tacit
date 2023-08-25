import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {take} from "rxjs/operators";
import {TemplatesService} from "@src/services/templates.service";
import {CssGroupsService} from '@src/store/state/css-groups.service';
import {ChromeService} from '@src/services/chrome.service';
import {ColorsService} from '@src/store/state/colors.service';
import {TypographyService} from '@src/store/state/typography.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  templateName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    protected cssGroupsService: CssGroupsService,
    protected typographyService: TypographyService,
    protected colorsService: ColorsService) {
  }

  ngOnInit() {
    this.cssGroupsService.get();
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

          this.chromeService.send({type: 'remove-variables'});

          const variables = [
            ...this.cssGroupsService.export(),
            ...this.colorsService.export(),
            ...this.typographyService.export()
          ];
          this.chromeService.send({type: 'set-variables', variables})
        });
    } else {
      this.cssGroupsService.setTemplate(null, new Map());
      this.colorsService.setTemplate(null, new Map());
      this.typographyService.setTemplate(null, new Map());
      this.chromeService.send({type: 'remove-variables'});
    }
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
    this.chromeService.send({type: 'remove-variables'});
  }
}
