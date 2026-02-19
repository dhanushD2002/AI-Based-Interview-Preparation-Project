import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent {

  @Input() questions: any[] = [];

    toggleAnswer(q: any) {
    q.show = !q.show;
  }

}
