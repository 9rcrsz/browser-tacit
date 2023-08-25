import { Injectable } from '@angular/core';
import { createTypography } from '@src/factories/typography.factory';
import { TypographyEnum } from '@src/models/typography.enum';
import { Typography } from '@src/models/typography.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface TypographyState extends EntityState<Typography> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'typography', idKey: 'name' })
export class TypographyStore extends EntityStore<TypographyState> {

  constructor() {
    super();

    const tmp: { [key: string]: Typography} = {};

    Object.values(TypographyEnum).forEach(name => {
      tmp[name] = createTypography({ name });
    })

    this.set(tmp);
  }

}
