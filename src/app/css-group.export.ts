import {CssGroup} from "./css-group.model";

export class CssGroupExport {
  protected model: CssGroup;

  constructor(m: CssGroup) {
    this.model = m;
  }

  export(): Array<string> {
    const variables = [];
    for (let i in this.model.general) {
      const name = '--' + i + '_' + this.model.name + ': ' + this.model.general[i] + ';';
      variables.push(name);
    }

    for (let i in this.model.desktop) {
      const name = '--' + i + '_' + this.model.name + '_desktop' + ': ' + this.model.general[i] + ';';
      variables.push(name);
    }

    for (let i in this.model.laptop) {
      const name = '--' + i + '_' + this.model.name + '_laptop' + ': ' + this.model.laptop[i] + ';';
      variables.push(name);
    }

    for (let i in this.model.tablet) {
      const name = '--' + i + '_' + this.model.name + '_tablet' + ': ' + this.model.tablet[i] + ';';
      variables.push(name);
    }

    for (let i in this.model.mobile) {
      const name = '--' + i + '_' + this.model.name + '_mobile' + ': ' + this.model.mobile[i] + ';';
      variables.push(name);
    }

    return variables;
  }
}
