import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin} from "rxjs";
import {take} from "rxjs/operators";
import {TemplatesService} from "@src/services/templates.service";
import {CssGroupsFacade} from '@src/store/css-groups/css-groups.facade';
import {ChromeService} from '@src/services/chrome.service';
import {ColorsFacade} from '@src/store/colors/colors.facade';
import {TypographyFacade} from '@src/store/typography/typography.facade';
import {FirebaseService} from '@src/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  protected chromeService: ChromeService = inject(ChromeService);
  protected templatesService: TemplatesService = inject(TemplatesService);
  protected cssGroupsFacade: CssGroupsFacade = inject(CssGroupsFacade);
  protected typographyFacade: TypographyFacade = inject(TypographyFacade);
  protected colorsFacade: ColorsFacade = inject(ColorsFacade);

  protected fbService: FirebaseService = inject(FirebaseService);

  ngOnInit() {
    this.cssGroupsFacade.get().subscribe(() => {
      this.chromeService.send({type: 'remove-variables'});

      const variables = [
        ...this.cssGroupsFacade.export(),
        ...this.colorsFacade.export(),
        ...this.typographyFacade.export()
      ];
      this.chromeService.send({type: 'set-variables', variables})
    });
  }

  templateSelected(templateName: string | null) {
    this.templatesService.templateName$.next(templateName)

    if (templateName !== null) {
      forkJoin([
        this.fbService.getSomething(this.templatesService.templateName$.value, 'colors'),
        this.fbService.getSomething(this.templatesService.templateName$.value, 'css-groups'),
        this.fbService.getSomething(this.templatesService.templateName$.value, 'typography')
      ]).subscribe(([colors, cssGroups, typography]) => {

        console.log(colors.data(), cssGroups.data(), typography.data());
        this.colorsFacade.setProject(new Map(Object.entries(colors.data() ?? {})));
        this.cssGroupsFacade.setProject(new Map(Object.entries(cssGroups.data() ?? {})));
        this.typographyFacade.setProject(new Map(Object.entries(typography.data() ?? {})));

        this.chromeService.send({type: 'remove-variables'});

        const variables = [
          ...this.cssGroupsFacade.export(),
          ...this.colorsFacade.export(),
          ...this.typographyFacade.export()
        ];
        this.chromeService.send({type: 'set-variables', variables});
      });
    } else {
      this.cssGroupsFacade.setProject(new Map());
      this.colorsFacade.setProject(new Map());
      this.typographyFacade.setProject(new Map());
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
    this.templatesService.templateName$.next(null);
    localStorage.clear();
    this.cssGroupsFacade.reset();
    this.colorsFacade.reset();
    this.typographyFacade.reset();
    this.chromeService.send({type: 'remove-variables'});
  }
}
