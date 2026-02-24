import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post<any>(this.baseUrl + '/login', data);
}

signup(data: any) {
  return this.http.post<any>(this.baseUrl + '/signup', data);
}
}
