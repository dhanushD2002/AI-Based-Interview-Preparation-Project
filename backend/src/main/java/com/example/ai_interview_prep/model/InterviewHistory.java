package com.example.ai_interview_prep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_history")
@Getter
public class InterviewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String type; // SKILL or RESUME

    @Setter
    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public InterviewHistory() {}

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}

