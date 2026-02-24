import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ===============================
  // SKILL INTERVIEW
  // ===============================
  generateSkillQuestions(
    skills: string[],
    difficulty: string
  ): Observable<any> {

    const email = localStorage.getItem('userEmail'); // 🔥 IMPORTANT

    return this.http.post<any>(
      `${this.apiUrl}/ai/skill-interview`,
      {
        skills,
        difficulty,
        email   // 👈 backend expects this
      }
    );
  }

  // ===============================
  // RESUME INTERVIEW
  // ===============================
  uploadResume(file: File) {

    const formData = new FormData();
    formData.append('file', file);

    const email = localStorage.getItem('userEmail'); // 🔥 IMPORTANT
    if (email) {
      formData.append('email', email);
    }

    return this.http.post<any[]>(
      `${this.apiUrl}/resume/upload`,
      formData
    );
  }

  getUserHistory(email: string) {
  return this.http.get<any[]>(
    `http://localhost:8080/api/history/${email}`
  );
}


}
