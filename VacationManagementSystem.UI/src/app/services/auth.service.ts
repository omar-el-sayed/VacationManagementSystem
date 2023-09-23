import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthModel } from '../models/AuthModel';
import { RegisterModel } from '../models/RegisterModel';
import { TokenRequestModel } from '../models/TokenRequestModel';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  register(model: RegisterModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.baseUrl}/api/Account/register`, model);
  }

  login(model: TokenRequestModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.baseUrl}/api/Account/login`, model);
  }

  getAllRoles(): Observable<any> | null {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.baseUrl}/api/Account`, { headers });
    }

    return null;
  }

  logout() {
    this.isAuthenticated.next(false);
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  checkAdminRole(): boolean {
    const token = this.getToken();
    if (token != null) {
      const user: any = jwtDecode(token);
      return user.roles?.includes('Admin');
    }

    return false;
  }

  saveToken(token: string) {
    this.cookieService.set('token', token);
  }

  getToken(): string | null {
    if (this.cookieService.check('token'))
      return this.cookieService.get('token');

    return null;
  }

  set setIsAuthenticated(newValue: boolean) {
    this.isAuthenticated.next(newValue);
  }

  get getIsAuthenticated(): boolean {
    return this.isAuthenticated.getValue();
  }

}
