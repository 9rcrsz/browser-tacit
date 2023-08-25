import {ColorsExport} from "@src/app/actions/colors.export";
import {ColorsEnum} from "@src/models/colors.enum";
import {Colors} from "@src/models/colors.model";

export function createColors(params?: Partial<Colors>): Colors {

  const tmpValues: { [key: string]: string } = {};
  for (let i in ColorsEnum) {
    tmpValues[i] = localStorage.getItem((ColorsEnum as any)[i]) ?? '';
  }

  return {
    template: params?.template ?? null,
    list: params?.list ?? tmpValues
  } as Colors
}

export function createColorsExport(colors: Colors): ColorsExport {
  return new ColorsExport(colors)
}
