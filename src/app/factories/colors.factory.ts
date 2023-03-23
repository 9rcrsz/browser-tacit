import { ColorsExport } from "@app/actions/colors.export";
import { ColorsEnum } from "@app/models/colors.enum";
import { Colors } from "@app/models/colors.model";

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
