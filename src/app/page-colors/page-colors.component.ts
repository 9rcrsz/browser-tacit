import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorsEnum } from '@src/models/colors.enum';
import { Colors } from "@src/models/colors.model";
import { ChromeService } from '@src/services/chrome.service';
import { TemplatesService } from '@src/services/templates.service';
import { ColorsQuery } from '@src/store/state/colors.query';
import { ColorsService } from '@src/store/state/colors.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './page-colors.component.html',
  styleUrls: ['./page-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageColorsComponent {

  constructor(
    public queryService: ColorsQuery,
    protected colorsService: ColorsService,
    protected chromeService: ChromeService,
    protected templatesService: TemplatesService) {
  }

  selectTemplate(templateName: string | null) {
    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.colorsService.setTemplate(templateName, data);
        });
    } else {
      this.colorsService.setTemplate(null, new Map());
    }
  }

  onChanged(property: { key: string, value: string }) {
    const varName = (ColorsEnum as any)[property.key];
    const varValue = property.value;

    this.colorsService.updateTemplate(null);
    this.colorsService.updateColor(property.key, varValue);
    localStorage.setItem(varName, varValue);
    this.chromeService.send({ type: 'set-variables', variables: [{ key: varName, value: varValue }] });
  }

  trackBy(index: number, a: any) {
    return a.key;
  }
}
