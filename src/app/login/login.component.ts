import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

declare var signXml: any;
declare var EventBus: any;
declare var endConnection: any;
declare var startConnection: any;
declare var getActiveTokens: any;
declare var selectSignType: any;

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    version: string;
    xml: string;
    error = '';
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    selectNCAStore() {
      startConnection();
      EventBus.subscribe('connect', res => {
        if (res === 1) {
  
          selectSignType('LOGIN')
        } else {
          console.log('Не запущен или не установлен NCALayer', 'Error')
  
          EventBus.unsubscribe('connect');
          // EventBus.unsubscribe('token');
        }
      });
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    startProcessSign(storage: string) {
        startConnection();
        EventBus.subscribe('connect', res => {
          if (res === 1) {
    
            this.signatureDocsConfirm();
          } else {
            console.log('Не запущен или не установлен NCALayer', 'Error')
    
            EventBus.unsubscribe('connect');
            EventBus.unsubscribe('token');
          }
        });
      }
    
      signatureDocsConfirm() {
        this.signXmlCall();
        EventBus.subscribe('signed', async (res) => {
          console.log('signed start', res);
          if (res['code'] === '500') {
            if (res.message !==  'action.canceled') {
                console.log(`Ошибка NCALayer: ${res.message}`, 'Error')
            }
            EventBus.unsubscribe('signed');
            EventBus.unsubscribe('connect');
            EventBus.unsubscribe('token');
            endConnection();
          }
    
          if (res['code'] === '200') {
            if (res['responseObject'] !== undefined) {
              const responseObj = res['responseObject'];
    
              console.log(responseObj)   // <--- выходной xml
    
              endConnection();
            }
          }
        });
      }
    
      signXmlCall() {
        const xmlToSign = '<xml></xml>'; // <-- генерация xml
        const selectedStorage = 'PKCS12';
    
        signXml(selectedStorage, 'SIGNATURE', xmlToSign, 'signXmlBack');
      }
    
      withOutSpaces(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode === 32) {
          return false;
        }
        return true;
      }

    onSubmit() {
        
        this.submitted = true;

        // // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //     return;
        // }

        this.loading = true;
        this.authenticationService.login(this.version, this.xml)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log(data)
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    console.log(error)
                });
    }
}