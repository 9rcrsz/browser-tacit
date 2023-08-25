import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {CssGroupsStore, CssGroupsState} from './css-groups.store';
import {Observable} from 'rxjs';
import {CssGroup} from '@src/models/css-group.model';

@Injectable({providedIn: 'root'})
export class CssGroupsQuery extends QueryEntity<CssGroupsState> {

  constructor(protected store: CssGroupsStore) {
    super(store);
  }

  getFirstLevel$(): Observable<CssGroup[]> {
    return this.selectAll({
      filterBy: [(g: CssGroup) => g.depth === 1]
    });
  }

  find$(selectedNames: Array<string>): Observable<CssGroup[]> {
    return this.selectAll({
      filterBy: [(g: CssGroup) => selectedNames.some(n => n === g.name)]
    });
  }

  filter$(phrase: string): Observable<CssGroup[]> {
    return this.selectAll({
      filterBy: [(g: CssGroup) => g.name.indexOf(phrase) > -1]
    });
  }

  getLevel$(depth: number, searchPrefix: string): Observable<CssGroup[]> {
    return this.selectAll({filterBy: [(g: CssGroup) => g.depth === depth && g.name.indexOf(searchPrefix) === 0]});
  }
}
