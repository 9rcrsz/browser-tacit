import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TypographyStore, TypographyState } from './typography.store';

@Injectable({ providedIn: 'root' })
export class TypographyQuery extends QueryEntity<TypographyState> {
  all$ = this.selectAll();

  constructor(protected store: TypographyStore) {
    super(store);
  }

}
