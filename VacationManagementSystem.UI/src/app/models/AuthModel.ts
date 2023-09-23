export class AuthModel {
  message: string = '';
  isAuthenticated: boolean = false;
  userName: string = '';
  email: string = '';
  roles: string[] = [];
  token: string = '';
  expiresOn: string = '';
}
