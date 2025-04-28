import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employeeDTO } from 'app/core/models/employeeDTO';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiURL}Employees`;

  constructor(private http: HttpClient) {}
  getEmployees(): Observable<employeeDTO[]> {
    return this.http.get<employeeDTO[]>(`${this.apiUrl}`);
  }
}
