import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VacationService } from '../services/vacation.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  updateEmployeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    salary: new FormControl(''),
    birthDate: new FormControl(''),
    hireDate: new FormControl(''),
    balance: new FormControl(''),
  });

  employee: Employee = new Employee();
  id: string = '';

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService, private _vacationService: VacationService, private router: Router) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getEmployeeById(this.id);
  }

  getEmployeeById(id: string) {
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getEmployeeById(id, token).subscribe(
        (employee: Employee) => {
          this.employee = employee;
          this.bindData(employee);
        },
        (err: any) => {
          console.log(err.errors);
        }
      );
    }
  }

  bindData(employee: Employee) {
    this.updateEmployeeForm.controls['firstName'].setValue(employee.firstName);
    this.updateEmployeeForm.controls['lastName'].setValue(employee.lastName);
    this.updateEmployeeForm.controls['address'].setValue(employee.address);
    this.updateEmployeeForm.controls['salary'].setValue(employee.salary);
    this.updateEmployeeForm.controls['birthDate'].setValue(new Date(employee.birthDate).toLocaleDateString());
    this.updateEmployeeForm.controls['hireDate'].setValue(new Date(employee.hireDate).toLocaleDateString());
    this.updateEmployeeForm.controls['balance'].setValue(employee.balance);
  }

  submitForm() {
    if (this.updateEmployeeForm.valid) {
      const token = this._authService.getToken();
      if (token) {
        this.employee.id = this.id;
        this.employee.balance = this.updateEmployeeForm.controls['balance'].value;
        this._vacationService.updateEmployee(this.employee, token).subscribe(
          (employee: Employee) => {
            this.router.navigate(['/employees']);
          },
          (err: any) => {
            console.log(err.errors);
          }
        );
      }
    }
    else {
      this.updateEmployeeForm.markAllAsTouched();
    }
  }
}
