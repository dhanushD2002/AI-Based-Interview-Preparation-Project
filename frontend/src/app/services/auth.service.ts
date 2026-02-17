import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

baseUrl = 'https://ai-based-interview-preparation-project-production.up.railway.app/api/auth';
;

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post<any>(this.baseUrl + '/login', data);
}

signup(data: any) {
  return this.http.post<any>(this.baseUrl + '/signup', data);
}
}
