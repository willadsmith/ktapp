import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseDashboardComponent } from './base/components/dashboard/dashboard.component';
import { LoginBaseComponent } from './base/login-base.component';
import { FoundComponent } from './founder/founder.component';
import { LayoutComponent } from './layout/layout.component';

// import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { BaseGuard } from './_helpers';

const routes: Routes = [
    { path: 'cabinet', component: LayoutComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    { path: 'base/dashboard', component: BaseDashboardComponent, canActivate: [BaseGuard] },
    { path: 'base/login', component: LoginBaseComponent },

    // otherwise redirect to home
    { path: '**', component: LoginComponent} 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
