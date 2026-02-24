import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInterviewComponent } from './skill-interview.component';

describe('SkillInterviewComponent', () => {
  let component: SkillInterviewComponent;
  let fixture: ComponentFixture<SkillInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
