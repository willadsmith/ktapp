import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
// import {AlertModule, BsDropdownModule, CollapseModule} from 'ngx-bootstrap';

import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';

import {ToasterModule} from 'angular2-toaster';
import {NotifyComponent} from './header/notify/notify.component';
import {NotifyService} from './header/notify/notify.service';
// import {SharedModule} from '../shared/shared.module';
import {NavbarComponent} from './navbar/navbar.component';
import {MenuComponent} from './header/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // SharedModule,
    // BsDropdownModule.forRoot(),
    // CollapseModule.forRoot(),
    // AlertModule.forRoot(),
    ToasterModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NotifyComponent,
    HeaderComponent,
    NavbarComponent,
    MenuComponent
  ],
  exports: [
    LayoutComponent,
    HeaderComponent
  ],
  providers: [NotifyService]
})

export class LayoutModule {
}
