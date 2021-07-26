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
declare var chooseNCAStorage: any;

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    version: string;
    xml: string;
    method: string;
    auth_xml: string;
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
        console.log(this.returnUrl)
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
          this.authSubmit()
        } else {
          console.log('Не запущен или не установлен NCALayer', 'Error')
  
          EventBus.unsubscribe('connect');
          // EventBus.unsubscribe('token');
        }
      });
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    authSubmit() {
      EventBus.subscribe('auth_token', response => {
        this.auth_xml = response

        this.onSubmit()
      })

      EventBus.unsubscribe('connect');
    }

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
    
              console.log(responseObj)
    
              endConnection();
            }
          }
        });
      }
    
      signXmlCall() {
        const xmlToSign = '<xml></xml>';
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

      const params = {
        xml: this.auth_xml
      }
        
        this.submitted = true;

        // // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //     return;
        // }

        this.version = '1.0'

        this.method = 'XML.verify'

        this.loading = true;
        this.authenticationService.login(params)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    console.log('error submit', error)
                });
    }
}