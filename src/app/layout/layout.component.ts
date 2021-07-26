import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
// import { UserProfileService } from '../core/services/user-profile.service';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { AuthService } from '../core/services/auth.service';
// import { SendValidationModalComponent } from '../shared/components/send-validation-modal/send-validation-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public currentUrl: string;
  public isLogged = false;
  // public modalRef: BsModalRef;
  public isMenuOpened = false;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false
    });

  constructor(private router: Router,
              private toasterService: ToasterService,
              // private userProfileService: UserProfileService,
              // private authService: AuthService,
              // private modalService: BsModalService
              ) {
    router.events.subscribe((url: any) => this.currentUrl = router.url);
    // if (authService.getToken() !== undefined) {
    //   this.isLogged = true;
    // }
  }

  private showPhoneActualizationModal(): void {
    // const login = this.userProfileService.getProfile().login;
    const initialState = {
      // login: login,
      isLoginEditable: true,
      isCloseable: false,
      requestParams: {
        action: 'CHANGE_LOGIN'
      },
      header: 'Актуализация по номеру телефона',
      confirmText: [`Уважаемый клиент!`, `Для дальнейшей работы в системе «BCC.KZ» Вам необходимо
    ввести код подтверждения, который будет отправлен на Ваш сотовый телефон после нажатия на кнопку «Отправить код
    подтверждения». В случае, если указанный номер телефона неверный, просим ввести корректный номер, при этом, Ваш
    логин будет изменен на указанный номер телефона. Данная процедура проводится в целях актуализации Ваших данных в
    Банке.`],
    };

    // this.modalRef = this.modalService.show(SendValidationModalComponent, {
    //   initialState,
    //   class: 'modal-phone-actualization2',
    //   ignoreBackdropClick: true,
    //   keyboard: false
    // });
    // this.modalRef.content.emitService.subscribe((response) => {
    //   if (response.success) {
    //     this.authService.isNeedActualization = false;
    //   }
    //   this.modalRef.hide();
    // });
  }

  toggleMenuState(e?) {
    this.isMenuOpened = !this.isMenuOpened;
  }

  ngOnInit() {
    // if (this.authService.isNeedActualization) {
    //   this.showPhoneActualizationModal();
    // }
  }
}
