import { ColorsEnum } from "@app/models/colors.enum";
import { Colors } from "@app/models/colors.model";

export class ColorsExport {
  protected model: Colors;

  constructor(m: Colors) {
    this.model = m;
  }

  export(): Array<string> {
    const variables: Array<string> = [];

    for (let i in this.model.list) {
      const name = (ColorsEnum as any)[i] + ': ' + this.model.list[i] + ';';
      variables.push(name);
    }

    return variables;
  }

}
