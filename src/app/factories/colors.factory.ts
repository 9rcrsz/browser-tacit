import {Colors} from "@app/models/colors.model";

export function createColors(params?: Partial<Colors>): Colors {
  return {
    template: params?.template ?? null,
    list: params?.list ?? {
      background: '#F4F4F5',
      background_additional: '#fdfdfd',
      background_warning: '#F8F0E1',
      text_high_emphasis: '#2a303a',
      text_mid_emphasis: 'rgba(42, 48, 58, 0.6)',
      text_low_emphasis: 'rgba(42, 48, 58, 0.38)',
      text_field_underline: 'rgba(42, 48, 58, 0.2)',
      separator: 'rgba(42, 48, 58, 0.15)',
      text_field_surface: 'rgba(42, 48, 58, 0.03)',
      snackbar: '#333',
      primary: '#275B8B',
      primary_variant: '#275B8B',
      secondary: '#275B8B',
      secondary_variant: '#ECF8FE',
      error: '#9A6500',
      skeleton1: '#EBEAEB',
      skeleton2: '#F4F4F4',
      text_primary_surface: '#275B8B',
      card: '#ffffff',
      card_high_emphasis: 'rgba(255, 255, 255, 0.87)',
      card_mid_emphasis: 'rgba(255, 255, 255, 0.6)',
      primary_opacity_10: 'rgb(0, 180, 141, 0.1)',
      menu_item_bg: '#eff8f6',
      text_on_error: '#ffffff',
      box_shadow: 'rgba(0, 0, 0, 0.16)',
    }
  } as Colors
}
