import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSidebarComponent } from './base-sidebar/sidebar.component';
import { BaseNavbarComponent } from './base-navbar/navbar.component';
import { BaseFooterComponent } from './base-footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseDashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    BaseFooterComponent,
    BaseNavbarComponent,
    BaseSidebarComponent,
    BaseDashboardComponent
  ],
  exports: [
    BaseFooterComponent,
    BaseNavbarComponent,
    BaseSidebarComponent
  ]
})
export class BaseComponentsModule { }
