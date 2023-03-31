import { Injectable } from '@angular/core';
import { createTypography } from '@app/factories/typography.factory';
import { Typography } from '@app/models/typography.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface TypographyState extends EntityState<Typography> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'typography', idKey: 'name' })
export class TypographyStore extends EntityStore<TypographyState> {

  constructor() {
    const names = [
      'txt-h1',
      'txt-h2',
      'txt-h3',
      'txt-h4',
      'txt-h5',
      'txt-h6',
    ];
    const tmp: { [key: string]: Typography} = {};
    names.forEach(name => {
      tmp[name] = createTypography({ name });
    })

    super();

    this.set(tmp);
  }

}
