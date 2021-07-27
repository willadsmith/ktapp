import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docs } from '../_models/docs';
import { BackendService } from '@app/_services/backend-service';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
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
              private backendService: BackendService,
              private authenticationService: AuthenticationService
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
      }
    };
  }

  toggleMenuState(e?) {
    this.isMenuOpened = !this.isMenuOpened;
  }

  getItems(): void {
    this.authenticationService.doc('/documents').subscribe(
      response => {
        console.log(response)
      }
  )}

  ngOnInit() {
    
    // const headers = {
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // }
    // this.http.get<any>(environment.apiUrl + '/documents', { headers }).subscribe(data => {
    //     console.log(data)
    // })

    // this.getItems()
    // if (this.authService.isNeedActualization) {
    //   this.showPhoneActualizationModal();
    // }
  }
}
