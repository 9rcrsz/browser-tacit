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
  loaging$ = new BehaviorSubject(false);

  ngOnInit() {
    this.cssGroupsFacade.get().subscribe(() => {
      const projectName = localStorage.getItem('project-name');
      if (projectName) {
        this.templateSelected(projectName);
      }
    });
  }

  templateSelected(templateName: string | null) {
    this.templatesService.templateName$.next(templateName)

    if (templateName !== null) {
      this.loaging$.next(true);
      localStorage.setItem('project-name', templateName);
      forkJoin([
        this.fbService.getSomething(this.templatesService.templateName$.value, 'colors'),
        this.fbService.getSomething(this.templatesService.templateName$.value, 'css-groups'),
        this.fbService.getSomething(this.templatesService.templateName$.value, 'typography')
      ]).subscribe(([colors, cssGroups, typography]) => {
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
        this.loaging$.next(false);
      });
    } else {
      localStorage.removeItem('project-name');
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

  reset(templateName: string | null) {
    if (!templateName) {
      return;
    }

    this.loaging$.next(true);
    this.templatesService.loadTemplate(templateName)
      .subscribe(
        data => {
          const colors: any = {};
          const typography: any = {};
          const cssGroups: any = {};
          data.forEach((cssValue, cssKey) => {
            if (cssKey.indexOf('--template_') === 0) {
              return;
            }
            if (cssKey.indexOf('--wo_') === 0) {
              colors[cssKey] = cssValue;
              return;
            }
            if (cssKey.indexOf('--typography') === 0) {
              typography[cssKey] = cssValue;
              return;
            }

            cssGroups[cssKey] = cssValue;
          })

          forkJoin([
            this.fbService.setSomething(templateName, 'colors', colors, false),
            this.fbService.setSomething(templateName, 'typography', typography, false),
            this.fbService.setSomething(templateName, 'css-groups', cssGroups, false)
          ]).subscribe(
            () => {
              this.templateSelected(templateName);
              this.loaging$.next(false);
            }
          )
        }
      )
  }
}
