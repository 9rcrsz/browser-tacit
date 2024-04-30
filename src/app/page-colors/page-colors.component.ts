import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ColorsEnum} from '@src/models/colors.enum';
import {TemplatesService} from '@src/services/templates.service';
import {ColorsQuery} from '@src/store/colors/colors.query';
import {ColorsFacade} from '@src/store/colors/colors.facade';
import {take} from 'rxjs/operators';
import {FirebaseService} from '@src/services/firebase.service';
import {EventService} from '@src/services/event.service';

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
    protected colorsFacade: ColorsFacade) {
  }

  selectTemplate(templateName: string | null) {
    if (templateName !== null) {
      this.fbService.getSomething(templateName, `colors`)
        .subscribe(res => {
          this.colorsFacade.cloneTemplate(this.templatesService.templateName$.value, new Map(Object.entries(res.data() ?? {})));
        });
    } else {
      this.colorsFacade.cloneTemplate(this.templatesService.templateName$.value, new Map());
    }
  }

  onChanged(property: { key: string, value: string }) {
    const varName = (ColorsEnum as any)[property.key];
    const varValue = property.value;

    this.colorsFacade.updateTemplate(null);
    this.colorsFacade.updateColor(property.key, varValue);

    this.fbService.setSomething(localStorage.getItem('project-name'), `colors`, {[varName]: varValue});
  }

  trackBy(index: number, a: any) {
    return a.key;
  }
}
