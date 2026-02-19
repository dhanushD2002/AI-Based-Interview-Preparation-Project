package com.example.ai_interview_prep.controller;

import com.example.ai_interview_prep.dto.InterviewQuestion;
import com.example.ai_interview_prep.model.InterviewHistory;
import com.example.ai_interview_prep.repository.InterviewHistoryRepository;
import com.example.ai_interview_prep.service.GenAiService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:4200")
public class SkillInterviewController {

    private final GenAiService genAiService;
    private final InterviewHistoryRepository historyRepo;

    public SkillInterviewController(
            GenAiService genAiService,
            InterviewHistoryRepository historyRepo
    ) {
        this.genAiService = genAiService;
        this.historyRepo = historyRepo;
    }

    @PostMapping("/skill-interview")
    public List<InterviewQuestion> generateSkillInterview(
            @RequestBody Map<String, Object> body
    ) throws Exception {

        // 🔥 USER IDENTIFICATION
        String userEmail = body.get("email").toString();

        String prompt =
                "Generate exactly 1 interview questions with answers for the skills: "
                        + body.get("skills") + ". "
                        + "Return ONLY a JSON array. "
                        + "Format: [{\"question\":\"...\",\"answer\":\"...\"}]";

        String aiResponse = genAiService.generateText(prompt)
                .replace("```json", "")
                .replace("```", "")
                .trim();

        if (!aiResponse.startsWith("[")) {
            aiResponse = "[" + aiResponse + "]";
        }

        ObjectMapper mapper = new ObjectMapper();

        List<InterviewQuestion> questions =
                mapper.readValue(aiResponse,
                        new TypeReference<List<InterviewQuestion>>() {});

        // 🔥 STEP 4 – SAVE TO DATABASE
        for (InterviewQuestion q : questions) {
            InterviewHistory history = new InterviewHistory();
            history.setUserEmail(userEmail);
            history.setType("SKILL");
            history.setQuestion(q.getQuestion());
            history.setAnswer(q.getAnswer());

            historyRepo.save(history);
        }

        return questions;
    }
}
