import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/Department';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vacation } from '../models/Vacation';
import { Employee } from '../models/Employee';
import { DashboardModel } from '../models/DashboardModel';
import { EmployeeDashboardModel } from '../models/EmployeeDashboardModel';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/api/Department`);
  }

  getEmployees(token: string): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Employee[]>(`${this.baseUrl}/api/Employee`, { headers });
  }

  getEmployeeById(id: string, token: string): Observable<Employee> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Employee>(`${this.baseUrl}/api/Employee/${id}`, { headers });
  }

  updateEmployee(employee: Employee, token: string): Observable<Employee> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Employee>(`${this.baseUrl}/api/Employee`, employee, { headers });
  }

  getDashboardCounts(token: string): Observable<DashboardModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DashboardModel>(`${this.baseUrl}/api/Dashboard/getcounts`, { headers });
  }

  getEmployeeDashboardCounts(token: string): Observable<EmployeeDashboardModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<EmployeeDashboardModel>(`${this.baseUrl}/api/Dashboard/getusercounts`, { headers });
  }

  getVacations(token: string): Observable<Vacation[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Vacation[]>(`${this.baseUrl}/api/Vacation/getall`, { headers });
  }

  getMyVacations(token: string): Observable<Vacation[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Vacation[]>(`${this.baseUrl}/api/Vacation/getuservacations`, { headers });
  }

  requestVacation(vacation: Vacation, token: string): Observable<Vacation> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Vacation>(`${this.baseUrl}/api/Vacation/request/vacation`, vacation, { headers });
  }

  approveVacation(id: number, token: string): Observable<Vacation> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Vacation>(`${this.baseUrl}/api/Vacation/approve/vacation`, id, { headers });
  }

}
