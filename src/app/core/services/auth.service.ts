import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://dummyjson.com/auth';
  constructor(private http: HttpClient) { }

  login(loginDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginDetails);
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/me`, { headers });
  }
}
