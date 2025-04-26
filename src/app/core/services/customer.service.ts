import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from 'app/core/models/customerDTO';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiURL}Customers`;
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/GetCustomerWithPredictedOrder`);
  }

}
