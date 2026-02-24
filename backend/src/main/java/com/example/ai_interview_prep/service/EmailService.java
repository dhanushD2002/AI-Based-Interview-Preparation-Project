package com.example.ai_interview_prep.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFeedbackMail(String name, String email, String message) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("YOUR_EMAIL@gmail.com"); // 🔥 your mail
        mail.setSubject("New Feedback from AI Interview Prep");

        mail.setText(
                "Name: " + name + "\n" +
                        "Email: " + email + "\n\n" +
                        "Feedback:\n" + message
        );

        mailSender.send(mail);
    }
}
