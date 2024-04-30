import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin} from "rxjs";
import {DomainTemplatesService} from "@src/services/domain-templates.service";
import {CssGroupsFacade} from '@src/store/css-groups/css-groups.facade';
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
  protected domainTemplatesService: DomainTemplatesService = inject(DomainTemplatesService);
  protected cssGroupsFacade: CssGroupsFacade = inject(CssGroupsFacade);
  protected typographyFacade: TypographyFacade = inject(TypographyFacade);
  protected colorsFacade: ColorsFacade = inject(ColorsFacade);

  protected fbService: FirebaseService = inject(FirebaseService);
  loaging$ = new BehaviorSubject(false);

  ngOnInit() {
    this.cssGroupsFacade.get().subscribe(() => {
      const projectName = localStorage.getItem('project-name');
      if (projectName) {
        this.domainSelected(projectName);
      }
    });
  }

  domainSelected(domainName: string | null) {
    this.domainTemplatesService.domainName$.next(domainName)

    if (domainName !== null) {
      this.loaging$.next(true);
      localStorage.setItem('project-name', domainName);
      forkJoin([
        this.fbService.getSomething(this.domainTemplatesService.domainName$.value, 'colors'),
        this.fbService.getSomething(this.domainTemplatesService.domainName$.value, 'css-groups'),
        this.fbService.getSomething(this.domainTemplatesService.domainName$.value, 'typography')
      ]).subscribe(([colors, cssGroups, typography]) => {
        this.colorsFacade.setProject(new Map(Object.entries(colors.data() ?? {})));
        this.cssGroupsFacade.setProject(new Map(Object.entries(cssGroups.data() ?? {})));
        this.typographyFacade.setProject(new Map(Object.entries(typography.data() ?? {})));
        this.loaging$.next(false);
      });
    } else {
      localStorage.removeItem('project-name');
      this.cssGroupsFacade.setProject(new Map());
      this.colorsFacade.setProject(new Map());
      this.typographyFacade.setProject(new Map());
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

  reset(domainName: string | null) {
    if (!domainName) {
      return;
    }

    this.loaging$.next(true);
    this.domainTemplatesService.loadDomainTemplate(domainName)
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
            this.fbService.setSomething(domainName, 'colors', colors, false),
            this.fbService.setSomething(domainName, 'typography', typography, false),
            this.fbService.setSomething(domainName, 'css-groups', cssGroups, false)
          ]).subscribe(
            () => {
              this.domainSelected(domainName);
              this.loaging$.next(false);
            }
          )
        }
      )
  }
}
