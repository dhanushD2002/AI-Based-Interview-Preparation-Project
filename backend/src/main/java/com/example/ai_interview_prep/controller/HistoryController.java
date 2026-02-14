package com.example.ai_interview_prep.controller;

import com.example.ai_interview_prep.model.InterviewHistory;
import com.example.ai_interview_prep.repository.InterviewHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoryController {

    private final InterviewHistoryRepository historyRepo;

    public HistoryController(InterviewHistoryRepository historyRepo) {
        this.historyRepo = historyRepo;
    }

    @GetMapping("/{email}")
    public List<InterviewHistory> getUserHistory(
            @PathVariable String email
    ) {
        return historyRepo.findByUserEmailOrderByCreatedAtDesc(email);
    }
}
