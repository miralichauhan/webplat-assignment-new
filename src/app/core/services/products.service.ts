import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl =  environment.apiUrl + '/products';
  constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
      return this.http.get(this.baseUrl).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('Failed to load products. Please try again later.'));
        })
      );
    }
}
