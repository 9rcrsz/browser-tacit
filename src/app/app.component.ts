import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {take} from "rxjs/operators";
import {TemplatesService} from "@src/services/templates.service";
import {CssGroupsFacade} from '@src/store/css-groups/css-groups.facade';
import {ChromeService} from '@src/services/chrome.service';
import {ColorsFacade} from '@src/store/colors/colors.facade';
import {TypographyFacade} from '@src/store/typography/typography.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  templateName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  protected chromeService: ChromeService = inject(ChromeService);
  protected templatesService: TemplatesService = inject(TemplatesService);
  protected cssGroupsFacade: CssGroupsFacade = inject(CssGroupsFacade);
  protected typographyFacade: TypographyFacade = inject(TypographyFacade);
  protected colorsFacade: ColorsFacade = inject(ColorsFacade);

  ngOnInit() {
    this.cssGroupsFacade.get();
  }

  templateSelected(templateName: string | null) {
    this.templateName$.next(templateName);
    localStorage.clear();

    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.colorsFacade.setTemplate(templateName, data);
          this.cssGroupsFacade.setTemplate(templateName, data);
          this.typographyFacade.setTemplate(templateName, data);

          this.chromeService.send({type: 'remove-variables'});

          const variables = [
            ...this.cssGroupsFacade.export(),
            ...this.colorsFacade.export(),
            ...this.typographyFacade.export()
          ];
          this.chromeService.send({type: 'set-variables', variables})
        });
    } else {
      this.cssGroupsFacade.setTemplate(null, new Map());
      this.colorsFacade.setTemplate(null, new Map());
      this.typographyFacade.setTemplate(null, new Map());
      this.chromeService.send({type: 'remove-variables'});
    }
  }

  export() {
    const variables = [
      ...this.cssGroupsFacade.export(),
      ...this.colorsFacade.export(),
      ...this.typographyFacade.export()
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
    this.cssGroupsFacade.reset();
    this.colorsFacade.reset();
    this.typographyFacade.reset();
    this.chromeService.send({type: 'remove-variables'});
  }
}
