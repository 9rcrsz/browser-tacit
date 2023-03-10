import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {CssGroupsStore, CssGroupsState} from './css-groups.store';
import { Observable } from 'rxjs';
import { CssGroup } from '@app/models/css-group.model';

@Injectable({providedIn: 'root'})
export class CssGroupsQuery extends QueryEntity<CssGroupsState> {

  constructor(protected store: CssGroupsStore) {
    super(store);
  }

  getFirstLevel$(): Observable<CssGroup[]> {
    return this.selectAll({filterBy: [(g: CssGroup) => g.depth === 1]});
  }
}
