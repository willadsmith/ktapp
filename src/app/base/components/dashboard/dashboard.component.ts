import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';

declare var signXml: any;
declare var EventBus: any;
declare var endConnection: any;
declare var startConnection: any;
declare var getActiveTokens: any;
declare var selectSignType: any;
declare var chooseNCAStorage: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class BaseDashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
) { }

  public clicked: boolean = true;
  public clicked1: boolean = false;
  public docsCompany;
  public signTag;
  public signStatus = false;

  ngOnInit() {
    this.dashboardService.docsCompany('/company').subscribe(res => {
      this.docsCompany = res.data
    })
  }

  startProcessSign(storage: string, sign: string) {
    this.signTag = sign
    console.log(this.signTag)
    startConnection();
    EventBus.subscribe('connect', res => {
      if (res === 1) {

        this.signatureDocsConfirm();
      } else {
        this.toastr.error('Не запущен или не установлен NCALayer', 'Ошибка')

        EventBus.unsubscribe('connect');
        EventBus.unsubscribe('token');
      }
    });
  }

  signatureDocsConfirm() {
    this.signXmlCall();
    EventBus.subscribe('signed', async (res) => {
      if (res['code'] === '500') {
        if (res.message !==  'action.canceled') {
          this.toastr.error(`Ошибка NCALayer: ${res.message}`, 'Ошибка')
        }
        EventBus.unsubscribe('signed');
        EventBus.unsubscribe('connect');
        EventBus.unsubscribe('token');
        endConnection();
      }

      if (res['code'] === '200') {
        if (res['responseObject'] !== undefined) {
          const xml = res['responseObject'];

          this.signStatus = true;

          this.toastr.success('Документ успешно подписан', 'Подписано')

          this.dashboardService.sign('/signature/document', {xml}).subscribe(response => console.log(response))

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
