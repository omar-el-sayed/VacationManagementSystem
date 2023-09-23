import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VacationRequestsComponent } from './vacation-requests/vacation-requests.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RolesComponent } from './roles/roles.component';
import { AuthorizeGuard } from './guards/authorize.guard';
import { RequestNewVacationComponent } from './request-new-vacation/request-new-vacation.component';
import { EmployeesComponent } from './employees/employees.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'vacations', component: VacationRequestsComponent, canActivate: [AuthGuard] },
  { path: 'request-vacation', component: RequestNewVacationComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthorizeGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthorizeGuard] },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [AuthorizeGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
