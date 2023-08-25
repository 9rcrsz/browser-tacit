import { Injectable } from '@angular/core';
import { createColors } from '@src/factories/colors.factory';
import { Colors } from '@src/models/colors.model';
import { Store, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'colors', resettable: true })
export class ColorsStore extends Store<Colors> {

  constructor() {
    super(createColors());
  }

}
