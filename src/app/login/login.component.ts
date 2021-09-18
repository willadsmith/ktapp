import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

declare var signXml: any;
declare var EventBus: any;
declare var endConnection: any;
declare var startConnection: any;
declare var getActiveTokens: any;
declare var selectSignType: any;
declare var chooseNCAStorage: any;

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    regItem = false;
    returnUrl: string;
    version: string;
    xml: string;
    method: string;
    auth_xml: string;
    reg_xml: string;
    error = '';
    roleUser: string;
    userObject: {};
    firstName: string;
    lastName: string;
    idn: string;
    bin: string;
    email: string;
    middleName: string;
    company: string;
    companyType: string;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { 
      this.userObject = this.authenticationService.currentUserValue
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

    changeReg() {
      this.regItem = !this.regItem
      this.firstName = ''
      this.lastName = ''
      this.idn = ''
      this.bin = ''
      this.email = ''
      this.middleName = ''
      this.company = ''
    }

    selectNCAStore() {
      startConnection();
      EventBus.subscribe('connect', res => {
        if (res === 1) {
          this.loading = true;
  
          selectSignType('LOGIN')
          this.authSubmit()
        } else {
          this.toastr.error('Не запущен или не установлен NCALayer', 'Ошибка NCALayer')
  
          EventBus.unsubscribe('connect');
          this.loading = false;
          // EventBus.unsubscribe('token');
        }
      });
    }

    selectNCAStoreReg() {
      startConnection();
      EventBus.subscribe('connect', res => {
        if (res === 1) {
          this.loading = true;
  
          // selectSignType('LOGIN')
          this.regSubmit()
        } else {
          this.toastr.error('Не запущен или не установлен NCALayer', 'Ошибка NCALayer')
  
          EventBus.unsubscribe('connect');
          this.loading = false;
          // EventBus.unsubscribe('token');
        }
      });
    }

    authSubmit() {
      EventBus.subscribe('signConnectResult', result => {
        if (result['message'] === 'action.canceled') {
          this.loading = false;
          this.toastr.error('Процесс подписи прекращен пользователем', 'Ошибка')

          selectSignType('')

          EventBus.unsubscribe('connect');
          EventBus.unsubscribe('signConnectResult')
          endConnection()
        } else {
          EventBus.subscribe('auth_token', response => {
            console.log('auth_token', response)
            this.auth_xml = response
    
            this.onSubmit()
          })

          EventBus.unsubscribe('signConnectResult')
          EventBus.unsubscribe('connect');
        }
      })
    }

    regSubmit() {
      this.signatureReg()
    }
    
    withOutSpaces(event): boolean {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode === 32) {
        return false;
      }
      return true;
    }

    onSubmit() {
      this.authenticationService.logout();

        const params = {
          xml: this.auth_xml
        }

        this.submitted = true;
        this.version = '1.0'
        this.method = 'XML.verify'

        this.loading = true;
        this.authenticationService.login(params)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.returnUrl = '/cabinet';
                    this.router.navigate([this.returnUrl]);
                    EventBus.unsubscribe('connect');
                    EventBus.unsubscribe('auth_token');
                    endConnection()
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.toastr.error(error, 'Ошибка')
                    EventBus.unsubscribe('connect');
                    EventBus.unsubscribe('auth_token');
                    endConnection()
                });
    }

    signatureReg() {
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
            const xml = res['responseObject'];

  
            this.authenticationService.logout();

            const signedXml = {
                params: {
                  xml: xml
                }
            }

            this.submitted = true;
            this.version = '1.0'
            this.method = 'XML.verify'

            this.loading = true;
            this.authenticationService.register(this.companyType, this.firstName, this.lastName, this.idn, this.bin, this.email, this.middleName, this.company, signedXml )
                .pipe(first())
                .subscribe(
                    data => {
                        this.loading = false;
                        this.toastr.success('Пользователь зарегистрирован', 'Готово')
                        this.changeReg()
                        this.returnUrl = '/cabinet';
                        this.router.navigate([this.returnUrl]);
                        EventBus.unsubscribe('connect');
                        EventBus.unsubscribe('auth_token');
                        endConnection()
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                        this.toastr.error(error.error, 'Ошибка')
                        EventBus.unsubscribe('connect');
                        EventBus.unsubscribe('auth_token');
                        endConnection()
                    });
      
                EventBus.unsubscribe('signed');
                EventBus.unsubscribe('connect');
                EventBus.unsubscribe('token');
      
                endConnection();
              }
            }
          });
    }
  
    signXmlCall() {
      const xmlToSign = '<xml>' + this.reg_xml + '</xml>';
      const selectedStorage = 'PKCS12';
  
      signXml(selectedStorage, 'SIGNATURE', xmlToSign, 'signXmlBack');
    }
}