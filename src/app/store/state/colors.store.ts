import { Injectable } from '@angular/core';
import { createColors } from '@app/factories/colors.factory';
import { Colors } from '@app/models/colors.model';
import { Store, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'colors', resettable: true })
export class ColorsStore extends Store<Colors> {

  constructor() {
    super(createColors());
  }

}
