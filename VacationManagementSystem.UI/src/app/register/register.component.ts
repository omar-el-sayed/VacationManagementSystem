import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacationService } from '../services/vacation.service';
import { Department } from '../models/Department';
import { RegisterModel } from '../models/RegisterModel';
import { AuthService } from '../services/auth.service';
import { AuthModel } from '../models/AuthModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  departments: Department[] = [];
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(128)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    address: new FormControl(''),
    salary: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
    birthDate: new FormControl(''),
    hireDate: new FormControl(''),
    departmentId: new FormControl(-1),
  });

  constructor(private _vacationService: VacationService, private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this._vacationService.getDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let registerModel: RegisterModel = new RegisterModel();
      registerModel = form.value;
      registerModel.departmentId = +registerModel.departmentId;
      this._authService.register(registerModel).subscribe(
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
