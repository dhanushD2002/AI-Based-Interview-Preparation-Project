import { Component } from '@angular/core';
import { AiService } from '../../services/ai.service';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';

@Component({
  selector: 'app-skill-interview',
  templateUrl: './skill-interview.component.html',
  styleUrls: ['./skill-interview.component.scss']
})
export class SkillInterviewComponent {

  skills: string[] = [];
  difficulty: string = 'Basic';
  questions: any[] = [];
  loading = false;

  constructor(private aiService: AiService) {}

  generateQuestions() {
    if (this.skills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    this.loading = true;

    this.aiService.generateSkillQuestions(this.skills, this.difficulty)
      .subscribe({
        next: (res) => {
          this.questions = res.map((q: any) => ({
            ...q,
            show: false
          }));
          this.loading = false;
        },
        error: () => {
          alert('Error generating questions');
          this.loading = false;
        }
      });
  }
downloadText() {
  let content = '';

  this.questions.forEach((q, i) => {
    content += `Q${i + 1}: ${q.question}\n`;
    content += `A: ${q.answer}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'skill-interview-questions.txt');
}
downloadPDF() {
  const pdf = new jsPDF();
  let y = 10;

  this.questions.forEach((q, i) => {
    pdf.text(`Q${i + 1}: ${q.question}`, 10, y);
    y += 8;
    pdf.text(`A: ${q.answer}`, 10, y);
    y += 15;

    if (y > 270) {
      pdf.addPage();
      y = 10;
    }
  });

  pdf.save('skill-interview-questions.pdf');
}
async downloadWord() {
  const paragraphs: Paragraph[] = [];

  this.questions.forEach((q, i) => {
    paragraphs.push(
      new Paragraph({ text: `Q${i + 1}: ${q.question}`, spacing: { after: 200 } }),
      new Paragraph({ text: `A: ${q.answer}`, spacing: { after: 400 } })
    );
  });

  const doc = new Document({
    sections: [{ children: paragraphs }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'skill-interview-questions.docx');
}
}
