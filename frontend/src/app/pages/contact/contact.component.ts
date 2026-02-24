import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
name = '';
  email = '';
  feedback = '';
  loading = false;

  constructor(private http: HttpClient) {}

  submitFeedback() {

    if (!this.name || !this.email || !this.feedback) {
      alert('Please fill all fields');
      return;
    }

    this.loading = true;

    this.http.post('http://localhost:8080/api/feedback', {
      name: this.name,
      email: this.email,
      message: this.feedback
    }).subscribe({
      next: () => {
        alert('Feedback sent successfully!');
        this.name = '';
        this.email = '';
        this.feedback = '';
        this.loading = false;
      },
      error: () => {
        alert('Failed to send feedback');
        this.loading = false;
      }
    });
  }
}
