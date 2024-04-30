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
  selector: 'select-domain',
  templateUrl: './select-domain.component.html',
  styleUrls: ['./select-domain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDomainComponent implements OnChanges {
  cdr = inject(ChangeDetectorRef);

  @Output() eventSelectDomain = new EventEmitter<string | null>();
  @Input() domainName: string | null = null;
  @Input() placeHolder: string = 'Clone template';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.domainName = null;
      this.cdr.markForCheck();
    }
  }

  onChanged(selectedDomainName: string | null) {
    this.eventSelectDomain.emit(selectedDomainName)
  }
}
