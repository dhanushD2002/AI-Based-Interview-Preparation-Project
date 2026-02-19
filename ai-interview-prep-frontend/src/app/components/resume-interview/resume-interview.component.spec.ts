import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInterviewComponent } from './resume-interview.component';

describe('ResumeInterviewComponent', () => {
  let component: ResumeInterviewComponent;
  let fixture: ComponentFixture<ResumeInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
