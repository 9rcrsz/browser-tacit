import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageSiteComponent} from "@app/page-site/page-site.component";
import {PageColorsComponent} from "@app/page-colors/page-colors.component";
import {PageContainerComponent} from "@app/page-container/page-container.component";
import {PageTypographyComponent} from "@app/page-typography/page-typography.component";

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
