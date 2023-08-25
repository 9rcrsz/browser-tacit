import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TypographyQuery} from "@src/store/typography/typography.query";
import {Typography} from "@src/models/typography.model";

@Component({
  templateUrl: './page-typography.component.html',
  styleUrls: ['./page-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTypographyComponent {
  typographyQuery: TypographyQuery = inject(TypographyQuery);

  trackByName(index: number, cssGroup: Typography) {
    return cssGroup.name;
  }
}
