import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CssGroupsQuery} from "@src/store/css-groups/css-groups.query";
import {CssGroup} from "@src/models/css-group.model";
import {Typography} from "@src/models/typography.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UnsubscribeService} from "@src/services/unsubscribe.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {filter, switchMap} from "rxjs/operators";

const nameToGroups: { [key: string]: Array<string> } = {
  'site-header': [
    'wo-header-component',
    'wo-logo-container',
    'wo-hamburger', 
    'wo-main-nav',
    'wo-my-program',
    'wo-select-lang',
    'wo-auth-section',
    'wo-bag'
  ],
  'site-footer': ['wo-footer-component'],
  'site-menu': [
    'wo-menus-component',
    'wo-menu-title-component',
    'wo-items-groups-container',
    'wo-menu-footer',
    'wo-menu-breadcrumbs-component',
    'wo-menu-and-categories',
    'wo-items-group-component'
  ],
  'site-base': ['html', 'body', 'wo-base-component'],
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
  // Autocomplete
  searchControl = new FormControl<string>('');
  filteredOptions?: Observable<CssGroup[]>;
  containerName?: string;

  ngOnInit(): void {
    this.containerName = this.route.snapshot.paramMap.get('containerName')!;
    this.findCssGroups(this.containerName);

    this.unService.handle = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.containerName = this.route.snapshot.paramMap.get('containerName')!;
          this.cssGroups$.next([]);
          if (this.containerName !== 'site-custom') {
            this.findCssGroups(this.containerName);
          }
        }
      });

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      switchMap((phrase: any) => {
        if (!phrase || phrase.length < 6) {
          return of([]);
        }
        return this.cssGroupsQuery.filter$(phrase)
      })
    );
  }

  findCssGroups(containerName: string) {
    if (!nameToGroups[containerName]) {
      return;
    }

    this.unService.handle = this.cssGroupsQuery.find$(nameToGroups[containerName])
      .subscribe(groups => {
        this.cssGroups$.next(groups);
      });
  }

  filterCssGroups(phrase: any) {
    if (!phrase || phrase.length < 6) {
      return;
    }
    this.unService.handle = this.cssGroupsQuery.filter$(phrase)
      .subscribe(groups => {
        this.cssGroups$.next(groups);
      });
  }

  trackByName(index: number, cssGroup: CssGroup | Typography) {
    return cssGroup.name;
  }
}
