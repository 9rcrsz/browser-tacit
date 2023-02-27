import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CssGroup} from "./css-group.model";
import {CssService} from "./services/css.service";
import {CssGroupExport} from "./css-group.export";
import {CssGroupFactory} from "./css-group.factory";
import {TemplatesService} from "./services/templates.service";
import {take} from "rxjs/operators";

declare var chrome: any;


const ddd = {
  moduleClassName: 'paid-with',
  vars: [
    '--display_paid-with: flex',
    '--margin_paid-with: 0',
    '--padding_paid-with: 0',
    '--background_paid-with: none',
    '--order_paid-with: 99',
    '--flex-wrap_paid-with: wrap',
    '--display_paid-with_desktop: flex',
    '--margin_paid-with_desktop: 0',
    '--padding_paid-with_desktop: 0',
    '--background_paid-with_desktop: none',
    '--order_paid-with_desktop: 99',
    '--flex-wrap_paid-with_desktop: wrap',
    '--display_paid-with_laptop: flex',
    '--margin_paid-with_laptop: 0',
    '--padding_paid-with_laptop: 0',
    '--background_paid-with_laptop: none',
    '--order_paid-with_laptop: 99',
    '--flex-wrap_paid-with_laptop: wrap',
    '--display_paid-with_tablet: flex',
    '--margin_paid-with_tablet: 0',
    '--padding_paid-with_tablet: 0',
    '--background_paid-with_tablet: none',
    '--order_paid-with_tablet: 1',
    '--flex-wrap_paid-with_tablet: wrap',
    '--display_paid-with_mobile: flex',
    '--margin_paid-with_mobile: 0',
    '--padding_paid-with_mobile: 0',
    '--background_paid-with_mobile: none',
    '--order_paid-with_mobile: 1',
    '--flex-wrap_paid-with_mobile: wrap',
    '--line-height_order-part_txt-subtitle1_paid-with_header: 24px',
    '--text-transform_order-part_txt-subtitle1_paid-with_header: none',
    '--letter-spacing_order-part_txt-subtitle1_paid-with_header: 0.09px',
    '--color_order-part_txt-subtitle1_paid-with_header: var(--wo_text_high_emphasis, #2a303a)',
    '--display_order-part_txt-subtitle1_paid-with_header: inline-flex',
    '--margin_order-part_txt-subtitle1_paid-with_header: 0',
    '--padding_order-part_txt-subtitle1_paid-with_header: 0 0 20px 0',
    '--width_order-part_txt-subtitle1_paid-with_header: 100%',
    '--display_order-part_txt-subtitle1_paid-with_header_laptop: inline-flex',
    '--margin_order-part_txt-subtitle1_paid-with_header_laptop: 0',
    '--padding_order-part_txt-subtitle1_paid-with_header_laptop: 0 0 20px 0',
    '--width_order-part_txt-subtitle1_paid-with_header_laptop: 100%',
    '--display_order-part_txt-subtitle1_paid-with_header_tablet: inline-flex',
    '--margin_order-part_txt-subtitle1_paid-with_header_tablet: 0',
    '--padding_order-part_txt-subtitle1_paid-with_header_tablet: 0 0 20px 0',
    '--width_order-part_txt-subtitle1_paid-with_header_tablet: 100%',
    '--display_order-part_txt-subtitle1_paid-with_header_mobile: inline-flex',
    '--margin_order-part_txt-subtitle1_paid-with_header_mobile: 0',
    '--padding_order-part_txt-subtitle1_paid-with_header_mobile: 0 0 16px 0',
    '--width_order-part_txt-subtitle1_paid-with_header_mobile: 100%',
    '--display_order-part_paid-with_header_hr: block',
    '--margin_order-part_paid-with_header_hr: 40px 0 30px 0',
    '--padding_order-part_paid-with_header_hr: 0',
    '--background_order-part_paid-with_header_hr: none',
    '--width_order-part_paid-with_header_hr: 100%',
    '--border-top_order-part_paid-with_header_hr: 1px solid var(--wo_separator, rgba(42, 48, 58, 0.15))',
    '--display_order-part_paid-with_header_hr_desktop: block',
    '--margin_order-part_paid-with_header_hr_desktop: 40px 0 30px 0',
    '--padding_order-part_paid-with_header_hr_desktop: 0',
    '--background_order-part_paid-with_header_hr_desktop: none',
    '--width_order-part_paid-with_header_hr_desktop: 100%',
    '--border-top_order-part_paid-with_header_hr_desktop: 1px solid var(--wo_separator, rgba(42, 48, 58, 0.15))',
    '--display_order-part_paid-with_header_hr_laptop: block',
    '--margin_order-part_paid-with_header_hr_laptop: 40px 0 30px 0',
    '--padding_order-part_paid-with_header_hr_laptop: 0',
    '--background_order-part_paid-with_header_hr_laptop: none',
    '--width_order-part_paid-with_header_hr_laptop: 100%',
    '--border-top_order-part_paid-with_header_hr_laptop: 1px solid var(--wo_separator, rgba(42, 48, 58, 0.15))',
    '--display_order-part_paid-with_header_hr_tablet: block',
    '--margin_order-part_paid-with_header_hr_tablet: 40px 0 30px 0',
    '--padding_order-part_paid-with_header_hr_tablet: 0',
    '--background_order-part_paid-with_header_hr_tablet: none',
    '--width_order-part_paid-with_header_hr_tablet: 100%',
    '--border-top_order-part_paid-with_header_hr_tablet: 1px solid var(--wo_separator, rgba(42, 48, 58, 0.15))',
    '--display_order-part_paid-with_header_hr_mobile: block',
    '--margin_order-part_paid-with_header_hr_mobile: 24px 0 24px 0',
    '--padding_order-part_paid-with_header_hr_mobile: 0',
    '--background_order-part_paid-with_header_hr_mobile: none',
    '--width_order-part_paid-with_header_hr_mobile: 100%',
    '--border-top_order-part_paid-with_header_hr_mobile: 1px solid var(--wo_separator, rgba(42, 48, 58, 0.15))',
    '--display_paid-with_wo-main-container: flex',
    '--margin_paid-with_wo-main-container: 0',
    '--padding_paid-with_wo-main-container: 0',
    '--background_paid-with_wo-main-container: none',
    '--width_paid-with_wo-main-container: 100%',
    '--display_paid-with_wo-main-container_desktop: flex',
    '--margin_paid-with_wo-main-container_desktop: 0',
    '--padding_paid-with_wo-main-container_desktop: 0',
    '--background_paid-with_wo-main-container_desktop: none',
    '--width_paid-with_wo-main-container_desktop: 100%',
    '--display_paid-with_wo-main-container_laptop: flex',
    '--margin_paid-with_wo-main-container_laptop: 0',
    '--padding_paid-with_wo-main-container_laptop: 0',
    '--background_paid-with_wo-main-container_laptop: none',
    '--width_paid-with_wo-main-container_laptop: 100%',
    '--display_paid-with_wo-main-container_tablet: flex',
    '--margin_paid-with_wo-main-container_tablet: 0',
    '--padding_paid-with_wo-main-container_tablet: 0',
    '--background_paid-with_wo-main-container_tablet: none',
    '--width_paid-with_wo-main-container_tablet: 100%',
    '--display_paid-with_wo-main-container_mobile: flex',
    '--margin_paid-with_wo-main-container_mobile: 0',
    '--padding_paid-with_wo-main-container_mobile: 0',
    '--background_paid-with_wo-main-container_mobile: none',
    '--width_paid-with_wo-main-container_mobile: 100%',
    '--display_paid-with_wo-main-container_wo-rows: flex',
    '--margin_paid-with_wo-main-container_wo-rows: 0',
    '--padding_paid-with_wo-main-container_wo-rows: 0',
    '--background_paid-with_wo-main-container_wo-rows: none',
    '--width_paid-with_wo-main-container_wo-rows: 100%',
    '--flex-direction_paid-with_wo-main-container_wo-rows: column',
    '--gap_paid-with_wo-main-container_wo-rows: 8px',
    '--display_paid-with_wo-main-container_wo-rows_desktop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_desktop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_desktop: 0',
    '--background_paid-with_wo-main-container_wo-rows_desktop: none',
    '--width_paid-with_wo-main-container_wo-rows_desktop: 100%',
    '--flex-direction_paid-with_wo-main-container_wo-rows_desktop: column',
    '--gap_paid-with_wo-main-container_wo-rows_desktop: 8px',
    '--display_paid-with_wo-main-container_wo-rows_laptop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_laptop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_laptop: 0',
    '--background_paid-with_wo-main-container_wo-rows_laptop: none',
    '--width_paid-with_wo-main-container_wo-rows_laptop: 100%',
    '--flex-direction_paid-with_wo-main-container_wo-rows_laptop: column',
    '--gap_paid-with_wo-main-container_wo-rows_laptop: 8px',
    '--display_paid-with_wo-main-container_wo-rows_tablet: flex',
    '--margin_paid-with_wo-main-container_wo-rows_tablet: 0',
    '--padding_paid-with_wo-main-container_wo-rows_tablet: 0',
    '--background_paid-with_wo-main-container_wo-rows_tablet: none',
    '--width_paid-with_wo-main-container_wo-rows_tablet: 100%',
    '--flex-direction_paid-with_wo-main-container_wo-rows_tablet: column',
    '--gap_paid-with_wo-main-container_wo-rows_tablet: 8px',
    '--display_paid-with_wo-main-container_wo-rows_mobile: flex',
    '--margin_paid-with_wo-main-container_wo-rows_mobile: 0',
    '--padding_paid-with_wo-main-container_wo-rows_mobile: 0',
    '--background_paid-with_wo-main-container_wo-rows_mobile: none',
    '--width_paid-with_wo-main-container_wo-rows_mobile: 100%',
    '--flex-direction_paid-with_wo-main-container_wo-rows_mobile: column',
    '--gap_paid-with_wo-main-container_wo-rows_mobile: 8px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row: 100%',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_desktop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_desktop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_desktop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_desktop: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_desktop: 100%',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_laptop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_laptop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_laptop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_laptop: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_laptop: 100%',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_tablet: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_tablet: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_tablet: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_tablet: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_tablet: 100%',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_mobile: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_mobile: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_mobile: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_mobile: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_mobile: 100%',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_wo-line: 100%',
    '--gap_paid-with_wo-main-container_wo-rows_wo-row_wo-line: 16px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: 100%',
    '--gap_paid-with_wo-main-container_wo-rows_wo-row_wo-line_desktop: 16px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: 100%',
    '--gap_paid-with_wo-main-container_wo-rows_wo-row_wo-line_laptop: 16px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: 100%',
    '--gap_paid-with_wo-main-container_wo-rows_wo-row_wo-line_tablet: 16px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: none',
    '--width_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: 100%',
    '--gap_paid-with_wo-main-container_wo-rows_wo-row_wo-line_mobile: 16px',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon: none',
    '--align-items_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon: center',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_desktop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_desktop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_desktop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_desktop: none',
    '--align-items_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_desktop: center',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_laptop: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_laptop: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_laptop: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_laptop: none',
    '--align-items_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_laptop: center',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_tablet: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_tablet: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_tablet: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_tablet: none',
    '--align-items_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_tablet: center',
    '--display_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mobile: flex',
    '--margin_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mobile: 0',
    '--padding_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mobile: 0',
    '--background_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mobile: none',
    '--align-items_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mobile: center',
    '--line-height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: 16px',
    '--text-transform_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: none',
    '--letter-spacing_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: 0.12px',
    '--color_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: var(--wo_text_high_emphasis, rgba(42, 48, 58, 0.6))',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: 44px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_laptop: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_laptop: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_laptop: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_laptop: 44px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_laptop: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_tablet: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_tablet: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_tablet: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_tablet: 44px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_tablet: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_mobile: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_mobile: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_mobile: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_mobile: 44px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_img_mobile: auto',
    '--line-height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: 16px',
    '--text-transform_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: none',
    '--letter-spacing_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: 0.12px',
    '--color_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: var(--wo_text_high_emphasis, rgba(42, 48, 58, 0.6))',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: 46px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_laptop: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_laptop: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_laptop: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_laptop: 46px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_laptop: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_tablet: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_tablet: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_tablet: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_tablet: 46px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_tablet: auto',
    '--display_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_mobile: inline-flex',
    '--margin_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_mobile: 0',
    '--padding_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_mobile: 0',
    '--width_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_mobile: 46px',
    '--height_txt-caption_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-icon_mat-icon_mobile: auto',
    '--line-height_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: 26px',
    '--text-transform_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: none',
    '--letter-spacing_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: 0.18px',
    '--color_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: var(--wo_text_high_emphasis, rgba(42, 48, 58, 0.6))',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: 0',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label: 0',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_laptop: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_laptop: 0',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_laptop: 0',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_tablet: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_tablet: 0',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_tablet: 0',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: 0',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: 0',
    '--font-size_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: 16px',
    '--line-height_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: 22px',
    '--letter-spacing_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-label_mobile: 0.16px',
    '--line-height_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: 26px',
    '--text-transform_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: none',
    '--letter-spacing_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: 0.18px',
    '--color_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: #2a303a',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: 0 0 0 auto',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: 0',
    '--flex_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price: 0 0 auto',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_laptop: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_laptop: 0 0 0 auto',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_laptop: 0',
    '--flex_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_laptop: 0 0 auto',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_tablet: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_tablet: 0 0 0 auto',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_tablet: 0',
    '--flex_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_tablet: 0 0 auto',
    '--display_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: inline-flex',
    '--margin_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 0 0 0 auto',
    '--padding_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 0',
    '--flex_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 0 0 auto',
    '--font-size_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 16px',
    '--line-height_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 22px',
    '--letter-spacing_txt-body1_paid-with_wo-main-container_wo-rows_wo-row_wo-line_wo-price_mobile: 0.16px',
  ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'browser-tacit';
  cssGroups$ = new BehaviorSubject<Map<string, CssGroup>>(new Map<string, CssGroup>());
  templateName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(protected cssService: CssService, protected templatesService: TemplatesService) {
  }

  ngOnInit() {
    // this.subscribe();

    this.cssGroups$.next(this.cssService.buildCssGroupsMap(ddd));
  }

  onChanged(data: { key: string, value: string }) {
    this.send({type: 'set-variables', variables: [data]});
  }

  templateSelected(templateName: string | null) {
    this.reset();
    this.templateName$.next(templateName);

    if (templateName !== null) {
      this.templatesService.templates.get(templateName)!
        .pipe(take(1))
        .subscribe(data => {
          this.cssGroups$.getValue().forEach(cssGroup => {
            cssGroup.template = templateName;
            CssGroupFactory.populateHandler(cssGroup).populate(data)
          })
        });
    }
  }

  send(request: { type: string, variables?: [{ key: string, value: string }] } = {type: 'get-variables'}) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then((data: any) => {
      chrome.tabs.sendMessage(data[0].id, request).then((d: any) => {
        console.log(d);
      });
    })
  }

  export() {
    let variables: Array<string> = [];
    this.cssGroups$.getValue().forEach(cssGroup => {
      const tmpForExport = new CssGroupExport(cssGroup);
      variables = [...variables, ...tmpForExport.export()]
    });

    navigator.clipboard.writeText(variables.join("\r\n")).then(function () {
      alert('Copied to clipboard.');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  reset() {
    this.templateName$.next(null);
    localStorage.clear();
    this.cssGroups$.getValue().forEach(cssGroup => {
      cssGroup.breakpoints.forEach(breakpoint => {
        breakpoint.forEach(property => {
          property.current = property.default;
        });
      });
    });
  }

  subscribe() {
    chrome.runtime.onMessage.addListener((request: { moduleClassName: string, vars: Array<string> }, sender: any, sendResponse: any) => {
        // this.cssGroups$.next(this.cssService.buildCssGroupsMap(request));

        console.log(this.cssGroups$.getValue());

        sendResponse({msg: "OK"});
      }
    );
  }
}
