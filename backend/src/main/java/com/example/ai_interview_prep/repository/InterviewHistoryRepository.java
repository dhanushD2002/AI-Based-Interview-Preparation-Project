package com.example.ai_interview_prep.repository;

import com.example.ai_interview_prep.model.InterviewHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewHistoryRepository
        extends JpaRepository<InterviewHistory, Long> {
    List<InterviewHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}
