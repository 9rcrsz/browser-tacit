import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {tap} from 'rxjs/operators';
import {CssGroupsStore} from './css-groups.store';
import {CssGroup} from "@app/models/css-group.model";

@Injectable({providedIn: 'root'})
export class CssGroupsService {

  constructor(private cssGroupsStore: CssGroupsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<CssGroup[]>('https://api.com').pipe(tap(entities => {
      this.cssGroupsStore.set(entities);
    }));
  }

  add(cssGroup: CssGroup) {
    this.cssGroupsStore.add(cssGroup);
  }

  update(id: string, cssGroup: Partial<CssGroup>) {
    this.cssGroupsStore.update(id, cssGroup);
  }

  remove(id: ID) {
    this.cssGroupsStore.remove(id);
  }

}
