import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Docs } from '../_models/docs';
// import { User } from '../_models/user';
import { BackendService } from '@app/_services/backend-service';
import { ToasterConfig } from 'angular2-toaster';
import { AuthenticationService } from '../_services/authentication.service';
// import { DashboardService } from '../_services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

declare var signXml: any;
declare var EventBus: any;
declare var endConnection: any;
declare var startConnection: any;
// declare var getActiveTokens: any;
// declare var selectSignType: any;
// declare var chooseNCAStorage: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public currentUrl: string;
  public isLogged = false;
  public isMenuOpened = false;
  public docs;
  public signTag;
  public signStatus = false;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false
    });

  constructor(private router: Router,
              private toastr: ToastrService,
              private backendService: BackendService,
              private authenticationService: AuthenticationService
              ) {
    router.events.subscribe((url: any) => this.currentUrl = router.url);
  }

  toggleMenuState(e?) {
    this.isMenuOpened = !this.isMenuOpened;
  }

  ngOnInit() {
    this.authenticationService.doc('/documents').subscribe(
      response => {
        this.docs = response
      }
    )
  }

  startProcessSign(storage: string, sign: string) {
    this.signTag = sign
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
          const xml = res['responseObject'];

          const params = {
            xml: xml
          }

          this.signStatus = true;

          this.authenticationService.sign('/signature/document', {params}).subscribe(response => {
            if (response.statusCode === 416) {
              this.toastr.error(response.message, 'Ошибка подписи')
            } else {
              this.toastr.success('Документ успешно подписан', 'Подписано')

              this.authenticationService.doc('/documents').subscribe(
                response => {
                  this.docs = response
                }
              )
            }
          })

          EventBus.unsubscribe('signed');
          EventBus.unsubscribe('connect');
          EventBus.unsubscribe('token');

          endConnection();
        }
      }
    });
  }

  signXmlCall() {
    const xmlToSign = '<xml>' + this.signTag + '</xml>';
    const selectedStorage = 'PKCS12';

    signXml(selectedStorage, 'SIGNATURE', xmlToSign, 'signXmlBack');
  }
}
