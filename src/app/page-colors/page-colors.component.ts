import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ColorsEnum} from '@src/models/colors.enum';
import {ChromeService} from '@src/services/chrome.service';
import {TemplatesService} from '@src/services/templates.service';
import {ColorsQuery} from '@src/store/colors/colors.query';
import {ColorsFacade} from '@src/store/colors/colors.facade';
import {take} from 'rxjs/operators';
import {FirebaseService} from '@src/services/firebase.service';

@Component({
  templateUrl: './page-colors.component.html',
  styleUrls: ['./page-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageColorsComponent {
  templatesService = inject(TemplatesService);
  protected fbService = inject(FirebaseService);

  constructor(
    public queryService: ColorsQuery,
    protected colorsFacade: ColorsFacade,
    protected chromeService: ChromeService) {
  }

  selectTemplate(templateName: string | null) {
    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.colorsFacade.setProject(data);
        });
    } else {
      this.colorsFacade.setProject(new Map());
    }
  }

  onChanged(property: { key: string, value: string }) {
    const varName = (ColorsEnum as any)[property.key];
    const varValue = property.value;

    this.colorsFacade.updateTemplate(null);
    this.colorsFacade.updateColor(property.key, varValue);

    this.fbService.setSomething(this.templatesService.templateName$.value, `colors`, {[varName]: varValue});

    this.chromeService.send({type: 'set-variables', variables: [{key: varName, value: varValue}]});
  }

  trackBy(index: number, a: any) {
    return a.key;
  }
}
