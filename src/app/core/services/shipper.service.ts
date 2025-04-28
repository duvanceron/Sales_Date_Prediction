import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shipperDTO } from 'app/core/models/shipperDTO';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ShipperService {
  private apiUrl = `${environment.apiURL}Shippers`;

  constructor(private http: HttpClient) {}
  getShippers(): Observable<shipperDTO[]> {
    return this.http.get<shipperDTO[]>(`${this.apiUrl}/GetShippers`);
  }
}
