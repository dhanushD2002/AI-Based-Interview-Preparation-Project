package com.example.ai_interview_prep.dto;

public class InterviewQuestion {

    private String question;
    private String answer;

    // 🔥 REQUIRED FOR JACKSON
    public InterviewQuestion() {
    }

    public InterviewQuestion(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
