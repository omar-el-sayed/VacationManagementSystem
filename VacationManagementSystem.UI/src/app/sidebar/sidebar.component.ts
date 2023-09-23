import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  showNavBar: boolean = true;
  hasNavBar: boolean = true;
  isActive: boolean = true;
  activeLi: string = window.location.pathname;
  productCatalogMenuIsActive = false;
  settingsMenuIsActive = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
    if (this._authService.getIsAuthenticated || this._authService.getToken() != null)
      this.isAuthenticated = true;
    else
      this.isAuthenticated = false;

    if (this.isAuthenticated)
      this.isAdmin = this._authService.checkAdminRole();
  }

  toggleBar() {
    this.isActive = !this.isActive;
  }

  toggleLI(liName: string) {
    this.activeLi = liName;
    this.router.navigate([liName]);
  }

  isActivePath(...paths: string[]): boolean {
    return paths.includes(window.location.pathname);
  }

  toggelProductCatalogMenu() {
    this.settingsMenuIsActive = false;
    this.productCatalogMenuIsActive = !this.productCatalogMenuIsActive;
  }

  toggelSettingsMenu() {
    this.productCatalogMenuIsActive = false;
    this.settingsMenuIsActive = !this.settingsMenuIsActive;
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this._authService.logout();
  }
}
