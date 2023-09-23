import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VacationService } from '../services/vacation.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  settings = {
    selectMode: 'single',
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<img height="20" title="edit" src="assets/icons/table-edit.SVG" />',
        }
      ]
    },
    columns: {
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name',
      },
      address: {
        title: 'Address',
      },
      salary: {
        title: 'Salary',
      },
      balance: {
        title: 'Balance',
      },
      birthDate: {
        title: 'Birth Date',
        valuePrepareFunction: (date: any) => {
          return new Date(date).toLocaleDateString();
        }
      },
      hireDate: {
        title: 'Hire Date',
        valuePrepareFunction: (date: any) => {
          return new Date(date).toLocaleDateString();
        }
      }
    }
  };
  data: LocalDataSource = new LocalDataSource();
  selectedArr: Array<any> = [];
  selectedUserRow: any;
  hasSelected: boolean = false;
  showConfirmModal: boolean = false;
  showSideModal: boolean = false;
  isAdmin: boolean = false;

  constructor(private _authService: AuthService, private _vacationService: VacationService, private router: Router) {
  }

  ngOnInit(): void {
    if (this._authService.checkAdminRole())
      this.getAllEmployees();
  }

  getAllEmployees() {
    this.isAdmin = true;
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getEmployees(token).subscribe(
        (employees: Employee[]) => {
          this.data.load(employees);
          this.data.refresh();
        },
        err => {
          console.log(err.errors);
        }
      );
    }
  }

  onCustomAction(event: any) {
    if (this.isAdmin && event.action == "edit") {
      this.router.navigate(['/update-employee', event.data.id]);
    }
  }
}
