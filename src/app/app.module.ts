import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LayoutModule } from './layout/layout.module';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BackendService } from './_services/backend-service';

@NgModule({
    imports: [
        BrowserModule,
        LayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        BackendService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }