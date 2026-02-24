import { Component } from '@angular/core';
import { AiService } from '../../services/ai.service';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resume-interview',
  templateUrl: './resume-interview.component.html',
  styleUrls: ['./resume-interview.component.scss']
})
export class ResumeInterviewComponent {

  selectedFile: File | null = null;
  loading = false;
  questions: any[] = [];

  constructor(private aiservice: AiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

generateQuestions() {
  if (!this.selectedFile) {
    alert('Upload resume first');
    return;
  }

  this.loading = true;

  this.aiservice.uploadResume(this.selectedFile).subscribe({
    next: (res: any[]) => {
      // ✅ Assume backend ALWAYS returns array
      this.questions = res.map(q => ({
        question: q.question,
        answer: q.answer,
        show: false
      }));
      this.loading = false;
    },
    error: () => {
      alert('Error analyzing resume');
      this.loading = false;
    }
  });
}

  toggle(q: any) {
    q.show = !q.show;
  }
  downloadText() {
  let content = '';

  this.questions.forEach((q: any, i: number) => {
    content += `Q${i + 1}: ${q.question}\n`;
    content += `Answer: ${q.answer}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  saveAs(blob, 'resume-interview-questions.txt');
}
downloadPDF() {
  const pdf = new jsPDF();
  let y = 10;

  this.questions.forEach((q: any, i: number) => {
    pdf.text(`Q${i + 1}: ${q.question}`, 10, y);
    y += 8;

    const answerLines = pdf.splitTextToSize(q.answer, 180);
    pdf.text(answerLines, 10, y);
    y += answerLines.length * 8 + 5;

    if (y > 270) {
      pdf.addPage();
      y = 10;
    }
  });

  pdf.save('resume-interview-questions.pdf');
}
downloadWord() {
  let content = '<html><body>';

  this.questions.forEach((q: any, i: number) => {
    content += `<h3>Q${i + 1}: ${q.question}</h3>`;
    content += `<p><b>Answer:</b> ${q.answer}</p><br/>`;
  });

  content += '</body></html>';

  const blob = new Blob([content], {
    type: 'application/msword'
  });

  saveAs(blob, 'resume-interview-questions.doc');
}


}
