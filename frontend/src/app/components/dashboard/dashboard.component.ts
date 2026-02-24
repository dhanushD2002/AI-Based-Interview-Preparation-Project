import { Component, OnInit } from '@angular/core';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeTab: 'skill' | 'resume' = 'skill';

  history: any[] = [];

  userEmail: string | null = localStorage.getItem('userEmail');

  constructor(private aiService: AiService) {}

  ngOnInit() {
  if (this.userEmail) {
    this.aiService.getUserHistory(this.userEmail)
      .subscribe(data => this.history = data);
  }
  }
}
