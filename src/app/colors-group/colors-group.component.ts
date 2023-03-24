import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorsEnum } from '@app/models/colors.enum';
import { Colors } from "@app/models/colors.model";
import { ChromeService } from '@app/services/chrome.service';
import { TemplatesService } from '@app/services/templates.service';
import { ColorsQuery } from '@app/store/state/colors.query';
import { ColorsService } from '@app/store/state/colors.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-colors-group',
  templateUrl: './colors-group.component.html',
  styleUrls: ['./colors-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsGroupComponent {

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
