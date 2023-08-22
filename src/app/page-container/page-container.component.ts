import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CssGroupsQuery} from "@app/store/state/css-groups.query";
import {CssGroup} from "@app/models/css-group.model";
import {Typography} from "@app/models/typography.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UnsubscribeService} from "@app/services/unsubscribe.service";
import {BehaviorSubject} from "rxjs";

const nameToGroups: { [key: string]: Array<string> } = {
  'site-header': ['header', 'wo-header-component'],
  'site-footer': ['wo-footer-component'],
  'site-menu': ['wo-menu-title-component', 'wo-menu-footer', 'wo-menu-breadcrumbs-component'],
  'site-base': ['body'],
  'site-menu-item': ['wo-item-component'],
}

@Component({
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit {
  // Injectors
  cssGroupsQuery: CssGroupsQuery = inject(CssGroupsQuery);
  unService: UnsubscribeService = inject(UnsubscribeService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  // Variables
  cssGroups$ = new BehaviorSubject<CssGroup[]>([])

  ngOnInit(): void {
    let containerName: string = this.route.snapshot.paramMap.get('containerName')!;
    this.filterCssGroups(containerName);

    this.unService.handle = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          containerName = this.route.snapshot.paramMap.get('containerName')!;
          this.filterCssGroups(containerName);
        }
      });
  }

  filterCssGroups(containerName: string) {
    this.unService.handle = this.cssGroupsQuery.getFirstLevel$(nameToGroups[containerName])
      .subscribe(groups => {
        this.cssGroups$.next(groups);
      });
  }

  trackByName(index: number, cssGroup: CssGroup | Typography) {
    return cssGroup.name;
  }
}
