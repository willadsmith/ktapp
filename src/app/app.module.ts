import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
import { BaseComponentsModule } from './base/components/components.module';
import { FoundComponent } from './founder/founder.component';

@NgModule({
    imports: [
        BrowserModule,
        LayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BaseComponentsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        FoundComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        BackendService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }