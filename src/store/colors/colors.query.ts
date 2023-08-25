import { Injectable } from '@angular/core';
import { Colors } from '@src/models/colors.model';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ColorsStore } from './colors.store';

@Injectable({ providedIn: 'root' })
export class ColorsQuery extends Query<Colors> {
  list$: Observable<{ list: { [key: string]: string } }> = this.select(['list']);
  template$: Observable<{ template: string | null }> = this.select(['template']);

  constructor(protected store: ColorsStore) {
    super(store);
  }

}
