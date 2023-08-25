import {ColorsEnum} from "@src/models/colors.enum";
import {Colors} from "@src/models/colors.model";

export class ColorsExport {
  protected model: Colors;

  constructor(m: Colors) {
    this.model = m;
  }

  export(): Array<string> {
    const variables: Array<string> = [];

    for (const i in this.model.list) {
      if (this.model.list[i]) {
        const name = (ColorsEnum as any)[i] + ': ' + this.model.list[i] + ';';
        variables.push(name);
      }
    }

    return variables;
  }

}
