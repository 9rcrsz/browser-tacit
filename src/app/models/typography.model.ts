export interface Typography {
  name: string;
  template: string | null;
  bps: { [breakpoint: string]: { [property: string]: string } };
}
