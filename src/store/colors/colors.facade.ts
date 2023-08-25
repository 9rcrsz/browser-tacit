import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createColorsExport } from '@src/factories/colors.factory';
import { ColorsEnum } from '@src/models/colors.enum';
import { ColorsStore } from './colors.store';

@Injectable({ providedIn: 'root' })
export class ColorsFacade {

  constructor(private colorsStore: ColorsStore, private http: HttpClient) {
  }

  updateTemplate(value: string | null) {
    this.colorsStore.update({ template: value })
  }

  updateColor(property: string, value: string) {
    const tmp: { [key: string]: string } = {};
    tmp[property] = value;

    this.colorsStore.update(tmp);

    this.colorsStore.update(state => ({
      ...state,
      list: { ...state.list, ...tmp }
    }));
  }

  export(): Array<string> {
    return createColorsExport(this.colorsStore.getValue()).export();
  }

  setTemplate(templateName: string | null, data: Map<string, string>) {
    this.reset();
    this.updateTemplate(templateName);

    const tmpValues: { [key: string]: string } = {};
    for (let i in ColorsEnum) {
      if(data.has((ColorsEnum as any)[i])){
        tmpValues[i] =  data.get((ColorsEnum as any)[i])!;
        localStorage.setItem((ColorsEnum as any)[i], tmpValues[i]);

      }else{
        localStorage.removeItem((ColorsEnum as any)[i]);
      }
    }

    this.colorsStore.update(state => ({
      ...state,
      list: { ...state.list, ...tmpValues }
    }));
  }

  reset() {
    this.colorsStore.reset();
  }
}
