import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TemplatesService} from "../services/templates.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTemplateComponent {
  @Output() eventSelectTemplate = new EventEmitter<string>();
  templateName?: string;

  constructor(protected tService: TemplatesService) {
  }

  onChanged(selectedTemplateName: string) {
    this.tService.loadTemplate(selectedTemplateName);
    this.eventSelectTemplate.emit(selectedTemplateName)
  }
}
