import {Component, OnInit} from '@angular/core';
// import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
// import {NewsService} from '../../../pages/news/services/news.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public currentUrl: string;

  constructor(
    // private authService: AuthService,
              // private offersService: NewsService,
              private router: Router) {
    this.currentUrl = router.url;
  }

  public logout(): void {
    // this.authService.logout();
  }

  goToNews() {
    // this.offersService.news = undefined;
    this.router.navigate(['/news']);
  }

  ngOnInit() {
  }
}
