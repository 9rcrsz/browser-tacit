import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {CssGroup} from "@app/models/css-group.model";

export interface CssGroupsState extends EntityState<CssGroup> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'css-groups', idKey: 'name', deepFreezeFn: obj=>obj})
export class CssGroupsStore extends EntityStore<CssGroupsState> {

  constructor() {
    super();
  }

}
