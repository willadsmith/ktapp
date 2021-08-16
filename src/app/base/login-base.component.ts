import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DashboardService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login-base.component.html',
  styleUrls: ['./login-base.component.scss']
})
export class LoginBaseComponent implements OnInit, OnDestroy {
    // loginForm: FormGroup;
    // loading = false;
    // submitted = false;
    // returnUrl: string;
    // error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private dashboardService: DashboardService
    ) { 
        // redirect to home if already logged in
        // if (this.dashboardService.currentUserValue) { 
        //     this.router.navigate(['/base/dashboard']);
        // }
    }

  ngOnInit() {
//       this.loginForm = this.formBuilder.group({
//           username: ['', Validators.required],
//           password: ['', Validators.required]
//       });

//       // get return url from route parameters or default to '/'
//       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   // convenience getter for easy access to form fields
//   get f() { return this.loginForm.controls; }

//   onSubmit() {
//       this.submitted = true;

//       // stop here if form is invalid
//       if (this.loginForm.invalid) {
//           return;
//       }

//       this.loading = true;
//       this.dashboardService.login(this.f.username.value, this.f.password.value)
//           .pipe(first())
//           .subscribe(
//               data => {
//                   this.router.navigate([this.returnUrl]);
//               },
//               error => {
//                   this.error = error;
//                   this.loading = false;
//               });
  }

  ngOnDestroy() {
  }

}
