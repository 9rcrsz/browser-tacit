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

export class CssGroup {
  name = '';
  depth = 0;

  general: { [key: string]: string } = {};
  desktop: { [key: string]: string } = {};
  laptop: { [key: string]: string } = {};
  tablet: { [key: string]: string } = {};
  mobile: { [key: string]: string } = {};

  desktopToggle = false;
  laptopToggle = false;
  tabletToggle = false;
  mobileToggle = false;
}
