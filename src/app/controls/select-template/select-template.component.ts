import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {take} from "rxjs/operators";
import {TemplatesService} from "@src/services/templates.service";

@Component({
  selector: 'select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTemplateComponent {
  @Output() eventSelectTemplate = new EventEmitter<string | null>();
  @Input() templateName: string | null = null;

  constructor(protected tService: TemplatesService) {
  }

  onChanged(selectedTemplateName: string | null) {
    if (selectedTemplateName !== null) {
      this.tService.loadTemplate(selectedTemplateName);
    }

    this.eventSelectTemplate.emit(selectedTemplateName)
  }
}
