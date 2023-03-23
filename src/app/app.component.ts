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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'browser-tacit';
  colors$ = new BehaviorSubject<Colors>(createColors());
  templateName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService,
    protected cssGroupsService: CssGroupsService,
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
          this.colors$.getValue().template = templateName;
          this.cssGroupsService.setTemplate(templateName, data);

          this.chromeService.send({ type: 'remove-variables' });
          this.chromeService.send({ type: 'set-variables', variables: this.cssGroupsService.export() })
        });
    } else {
      this.cssGroupsService.setTemplate(null, new Map());
      this.chromeService.send({ type: 'remove-variables' });
    }
  }

  sync() {
    this.cssGroupsService.get();
    // this.chromeService.send({ type: 'get-variables' })
  }

  export() {
    const variables = [...this.cssGroupsService.export(),
    ...createColorsExport(this.colors$.getValue()).export()];

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
    this.chromeService.send({ type: 'remove-variables' });
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }
}
