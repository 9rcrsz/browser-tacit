export enum BreakpointTypes {
  general = 'general',
  desktop = 'desktop',
  laptop = 'laptop',
  tablet = 'tablet',
  mobile = 'mobile'
}

export enum CssPropertyTypes {
  padding = 'padding',
  margin = 'margin',
  display = 'display',
  color = 'color'
}

export interface CssValue {
  default: string,
  current: string,
  color?: string
}

export class CssGroup {
  name = '';
  depth = 0;

  general: { [key: string]: CssValue } = {};
  desktop: { [key: string]: CssValue } = {};
  laptop: { [key: string]: CssValue } = {};
  tablet: { [key: string]: CssValue } = {};
  mobile: { [key: string]: CssValue } = {};

  desktopToggle = false;
  laptopToggle = false;
  tabletToggle = false;
  mobileToggle = false;
}
