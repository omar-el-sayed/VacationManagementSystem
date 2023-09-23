import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { VacationService } from '../services/vacation.service';
import { Vacation } from '../models/Vacation';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-vacation-requests',
  templateUrl: './vacation-requests.component.html',
  styleUrls: ['./vacation-requests.component.css']
})
export class VacationRequestsComponent implements OnInit {

  settings = {
    selectMode: 'single',
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'approve',
          title: '<img height="20" title="Approve" src="assets/icons/table-edit.SVG" />',
        }
      ]
    },
    columns: {
      employee: {
        title: 'Employee',
        valuePrepareFunction: (employee: Employee) => {
          return `${employee.firstName} ${employee.lastName}`;
        }
      },
      startDate: {
        title: 'Start Date',
        valuePrepareFunction: (date: any) => {
          return new Date(date).toLocaleDateString();
        }
      },
      endDate: {
        title: 'End Date',
        valuePrepareFunction: (date: any) => {
          return new Date(date).toLocaleDateString();
        }
      },
      type: {
        title: 'Type',
      },
      reason: {
        title: 'Reason',
      },
      isApproved: {
        title: 'Status',
        valuePrepareFunction: (status: boolean) => {
          return status ? 'Approved' : 'Pending';
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

  constructor(private _authService: AuthService, private _vacationService: VacationService) {
  }

  ngOnInit(): void {
    if (this._authService.checkAdminRole())
      this.getAllVacations();
    else
      this.getMyVacations();
  }

  getAllVacations() {
    this.isAdmin = true;
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getVacations(token).subscribe(
        (vacations: Vacation[]) => {
          this.data.load(vacations);
          this.data.refresh();
        },
        err => {
          console.log(err);
        });
    }
  }

  getMyVacations() {
    this.isAdmin = false;
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getMyVacations(token).subscribe(
        (vacations: Vacation[]) => {
          this.data.load(vacations);
          this.data.refresh();
        },
        err => {
          console.log(err);
        });
    }
  }

  onCustomAction(event: any) {
    if (this.isAdmin && event.action == "approve") {
      const token = this._authService.getToken();
      if (token) {
        this._vacationService.approveVacation(event.data.id, token).subscribe(
          (vacation: Vacation) => {
            alert('Vacation request approved successfully.');
            this.getAllVacations();
          },
          err => {
            alert('Error: ' + err.error);
          }
        );
      }
    }
  }

}
