import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenRequestModel } from '../models/TokenRequestModel';
import { AuthModel } from '../models/AuthModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('admin@admin.com', [Validators.required, Validators.email, Validators.maxLength(128)]),
    password: new FormControl('admin@123', [Validators.required, Validators.maxLength(256)]),
  });

  constructor(private _authService: AuthService, private router: Router) { }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let tokenRequestModel: TokenRequestModel = new TokenRequestModel();
      tokenRequestModel = form.value;
      this._authService.login(tokenRequestModel).subscribe(
        (model: AuthModel) => {
          if (model.isAuthenticated) {
            this._authService.setIsAuthenticated = true;
            this._authService.saveToken(model.token);
            window.open('/dashboard', '_self');
          }
        },
        err => {
          alert('Error: ' + err.error);
        }
      );
    }
    else {
      form.markAllAsTouched();
    }
  }

}
