import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CssGroupsStore, CssGroupsState } from './css-groups.store';

@Injectable({ providedIn: 'root' })
export class CssGroupsQuery extends QueryEntity<CssGroupsState> {

  constructor(protected store: CssGroupsStore) {
    super(store);
  }

}
