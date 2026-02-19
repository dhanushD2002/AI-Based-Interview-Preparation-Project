package com.example.ai_interview_prep.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequest {
    private String name;
    private String email;
    private String message;
}
