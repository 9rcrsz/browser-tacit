import { Colors } from "@app/models/colors.model";

export class ColorsPopulate {
  protected model: Colors;

  constructor(m: Colors) {
    this.model = m;
  }

  populate(template: Map<string, string>) {

  }
}
