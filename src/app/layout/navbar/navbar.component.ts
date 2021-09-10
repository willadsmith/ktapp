import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userProfileName = '';

  constructor(
              private toasterService: ToasterService,
              private router: Router) {
  }

  // goToHistory() {
  //   this.router.navigate(['/my_requests']);
  // }

  ngOnInit() {
    if (this.userProfileName.length > 11) {
      this.userProfileName = this.userProfileName.slice(0, 11) + '...';
    }
  }
}
