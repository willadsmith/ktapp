import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseDashboardComponent } from './base/components/dashboard/dashboard.component';
import { LoginBaseComponent } from './base/login-base.component';
import { LayoutComponent } from './layout/layout.component';

// import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: LayoutComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'base/dashboard', component: BaseDashboardComponent, canActivate: [AuthGuard] },
    { path: 'base/login', component: LoginBaseComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
