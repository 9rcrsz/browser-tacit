import {CssGroup} from "./css-group.model";
import {CssGroupPopulate} from "./css-group.populate";
import {CssGroupExport} from "./css-group.export";

export class CssGroupFactory {
  static model() {
    return new CssGroup();
  }

  static populateHandler(cssGroup: CssGroup) {
    return new CssGroupPopulate(cssGroup);
  }

  static exportHandler(cssGroup: CssGroup) {
    return new CssGroupExport(cssGroup);
  }
}
