import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { Colors } from "@app/models/colors.model";
import { CssGroup } from "@app/models/css-group.model";
import { TemplatesService } from "@app/services/templates.service";
import { createColors } from "@app/factories/colors.factory";
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
    this.reset();
    this.templateName$.next(templateName);

    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.colors$.getValue().template = templateName;
          this.cssGroupsService.setTemplate(templateName, data);
        });
    }else{
      this.cssGroupsService.setTemplate(null, new Map());
    }
  }

  sync() {
    this.cssGroupsService.get();
    // this.chromeService.send({ type: 'get-variables' })
  }

  export() {
    const variables = this.cssGroupsService.export();

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
  }

  trackByName(index: number, cssGroup: CssGroup) {
    return cssGroup.name;
  }
}
