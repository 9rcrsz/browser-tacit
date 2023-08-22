import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {CssGroupsStore, CssGroupsState} from '@app/store/state/css-groups.store';
import {Observable} from 'rxjs';
import {CssGroup} from '@app/models/css-group.model';

@Injectable({providedIn: 'root'})
export class CssGroupsQuery extends QueryEntity<CssGroupsState> {

  constructor(protected store: CssGroupsStore) {
    super(store);
  }

  getFirstLevel$(selectedNames?: Array<string>): Observable<CssGroup[]> {
    return this.selectAll({
      filterBy: [
        (g: CssGroup) => {
          if (selectedNames) {
            return selectedNames.some(n => n === g.name);
          } else {
            return g.depth === 1;
          }
        }
      ]
    });
  }

  getLevel$(depth: number, searchPrefix: string): Observable<CssGroup[]> {
    return this.selectAll({filterBy: [(g: CssGroup) => g.depth === depth && g.name.indexOf(searchPrefix) === 0]});
  }
}
