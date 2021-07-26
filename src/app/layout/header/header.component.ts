import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
// import {AuthService} from '../../core/services/auth.service';
// import {UserProfileService} from '../../core/services/user-profile.service';
// import {CommunicateService} from '../../core/services/communicate.service';

interface LanguageInterface {
  code: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Input() isMenuOpened = false;
  @Output() toggleMenuState = new EventEmitter<boolean>();

  public currentUrl: string;
  public userName: string;
  public lastAuth: any;

  public currentLanguage: LanguageInterface;

  public availableLanguages: Array<LanguageInterface> = [
    {code: 'kz', name: 'Қаз'},
    {code: 'ru', name: 'Рус'},
    {code: 'en', name: 'Eng'}
  ];

  public isLogged = false;

  constructor(private router: Router,
              // private authService: AuthService,
              // private userProfileService: UserProfileService,
              private location: Location,
              // private communicateService: CommunicateService
              ) {
    this.currentUrl = router.url;

    // const userProfile = userProfileService.getProfile();

    this.isLogged = true; // authService.hasToken();

    if (this.isLogged === true) {
      // this.userName = userProfile.shortName;
      // this.lastAuth = userProfile.lastAuth;
    }

    this.currentLanguage = this.availableLanguages.find(value => value.code === localStorage.getItem('SB.Language'));
  }

  public setLanguage(lang: string) {
    // this.communicateService.publish('change-language', lang);
    this.currentLanguage = this.availableLanguages.find(value => value.code === lang);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.isMenuOpened = !this.isMenuOpened;
    this.toggleMenuState.emit(this.isMenuOpened);
  }

  goBack(): void {
    this.location.back();
  }
}
