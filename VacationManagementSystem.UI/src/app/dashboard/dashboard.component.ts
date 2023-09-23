import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { VacationService } from '../services/vacation.service';
import { DashboardModel } from '../models/DashboardModel';
import { EmployeeDashboardModel } from '../models/EmployeeDashboardModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardModel: DashboardModel = new DashboardModel();
  employeesDashboardModel: EmployeeDashboardModel = new EmployeeDashboardModel();
  isAdmin: boolean = false;

  constructor(private _authService: AuthService, private _vacationService: VacationService) { }

  ngOnInit(): void {
    if (this._authService.checkAdminRole())
      this.getCounts();
    else
      this.getEmployeeCounts();
  }

  getCounts() {
    this.isAdmin = true;
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getDashboardCounts(token).subscribe(
        (data: DashboardModel) => {
          this.dashboardModel = data;
        },
        (err: any) => {
          console.log(err.errors);
        }
      );
    }
  }

  getEmployeeCounts(){
    this.isAdmin = false;
    const token = this._authService.getToken();
    if (token) {
      this._vacationService.getEmployeeDashboardCounts(token).subscribe(
        (data: EmployeeDashboardModel) => {
          this.employeesDashboardModel = data;
        },
        (err: any) => {
          console.log(err.errors);
        }
      );
    }
  }

}
