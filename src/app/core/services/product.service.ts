import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productDTO } from 'app/core/models/productDTO';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiURL}Product`;

  constructor(private http: HttpClient) {}
  getProducts(): Observable<productDTO[]> {
    return this.http.get<productDTO[]>(`${this.apiUrl}`);
  }
}
