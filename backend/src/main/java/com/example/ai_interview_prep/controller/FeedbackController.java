package com.example.ai_interview_prep.controller;

import com.example.ai_interview_prep.dto.FeedbackRequest;
import com.example.ai_interview_prep.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {

    private final EmailService emailService;

    public FeedbackController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public void submit(@RequestBody FeedbackRequest req) {

        emailService.sendFeedbackMail(
                req.getName(),
                req.getEmail(),
                req.getMessage()
        );
    }
}
