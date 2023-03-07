import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Colors} from "@app/models/colors.model";

@Component({
  selector: 'app-colors-group',
  templateUrl: './colors-group.component.html',
  styleUrls: ['./colors-group.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsGroupComponent {
  @Input() colors!: Colors;

  constructor() {
  }
}
