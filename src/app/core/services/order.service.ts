import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { orderDTO } from 'app/core/models/orderDTO';
import { orderWithDetailDTO } from 'app/core/models/orderWithDetailDTO';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiURL}Orders`;

  constructor(private http: HttpClient) {}
  getOrders(custId: number): Observable<orderDTO[]> {
    const params = new HttpParams().set('Custid', custId.toString());
    return this.http.get<orderDTO[]>(this.apiUrl, { params });
  }
  createOrder(order: orderWithDetailDTO):Observable<any> {
    return this.http.post(this.apiUrl,order);
  }
}
