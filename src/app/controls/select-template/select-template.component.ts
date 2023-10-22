import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTemplateComponent implements OnChanges {
  cdr = inject(ChangeDetectorRef);

  @Output() eventSelectTemplate = new EventEmitter<string | null>();
  @Input() templateName: string | null = null;
  @Input() placeHolder: string = 'Clone template';
  @Input() filter?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.templateName = null;
      this.cdr.markForCheck();
    }
  }

  onChanged(selectedTemplateName: string | null) {
    this.eventSelectTemplate.emit(selectedTemplateName)
  }
}
