import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageSiteComponent} from "@src/app/page-site/page-site.component";
import {PageColorsComponent} from "@src/app/page-colors/page-colors.component";
import {PageContainerComponent} from "@src/app/page-container/page-container.component";
import {PageTypographyComponent} from "@src/app/page-typography/page-typography.component";
import {PageAssetsComponent} from '@src/app/page-assets/page-assets.component';

const routes: Routes = [
  {
    path: 'colors',
    component: PageColorsComponent
  },
  {
    path: 'typography',
    component: PageTypographyComponent
  },
  {
    path: 'assets',
    component: PageAssetsComponent
  },
  {
    path: '',
    component: PageSiteComponent,
    children: [
      {
        path: ':containerName',
        component: PageContainerComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
