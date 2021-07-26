import {Component, OnInit} from '@angular/core';
// import {UserProfileService} from '../../core/services/user-profile.service';
// import {ProductService} from '../../pages/products/services/product.service';
import {Router} from '@angular/router';
// import {CurrentProduct} from '../../core/models/products/current-product.model';
import {ToasterService} from 'angular2-toaster';
// import {UserProductsService} from '../../core/services/user-products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userProfileName = '';

  // currentProducts: Array<CurrentProduct> = [];

  constructor(
            // private userProfileService: UserProfileService,
              // private userProductsService: UserProductsService,
              // private productService: ProductService,
              private toasterService: ToasterService,
              private router: Router) {
  }

  goToHistory() {
    // this.productService.toHistoryPill = false;
    this.router.navigate(['/my_requests']);
  }

  // hasEpvCurrent() {
  //   if (this.userProductsService.getUserProductsForEpv().currentProducts.length > 0) {
  //     const check = this.userProductsService.getUserProductsForEpv().currentProducts.filter((product) => {
  //       return product.access_level === 2 && (<CurrentProduct>product).is_epv === true;
  //     }).length;

  //     if (check > 0) {
  //       this.router.navigate(['/epv']);
  //     } else {
  //       this.toasterService.pop('error', 'У Вас не открыт счет для ЕПВ');
  //     }
  //   }
  // }

  ngOnInit() {
    // this.userProfileName = this.userProfileService.getProfile().firstname;
    if (this.userProfileName.length > 11) {
      this.userProfileName = this.userProfileName.slice(0, 11) + '...';
    }
  }
}
