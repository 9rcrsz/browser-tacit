import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { ColorsEnum } from '@app/models/colors.enum';
import {Colors} from "@app/models/colors.model";
import { ChromeService } from '@app/services/chrome.service';

@Component({
  selector: 'app-colors-group',
  templateUrl: './colors-group.component.html',
  styleUrls: ['./colors-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsGroupComponent {
  @Input() colors!: Colors;

  constructor(protected chromeService: ChromeService) {
  }

  onChanged(property: { key: string, value: string }) {
    this.colors.template = null;
    localStorage.setItem((ColorsEnum as any)[property.key] , property.value);
    this.chromeService.send({ type: 'set-variables', variables: [{ key: (ColorsEnum as any)[property.key], value: property.value }] });
  }
}
