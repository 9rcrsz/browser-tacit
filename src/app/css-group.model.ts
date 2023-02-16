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

  general: { padding?: string, margin?: string, display?: string, color?: string } = {};
  desktop: { padding?: string, margin?: string, display?: string, color?: string } = {};
  laptop: { padding?: string, margin?: string, display?: string, color?: string } = {};
  tablet: { padding?: string, margin?: string, display?: string, color?: string } = {};
  mobile: { padding?: string, margin?: string, display?: string, color?: string } = {};

  desktopToggle = false;
  laptopToggle = false;
  tabletToggle = false;
  mobileToggle = false;
}
