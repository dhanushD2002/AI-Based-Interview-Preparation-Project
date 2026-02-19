package com.example.ai_interview_prep.controller;

import com.example.ai_interview_prep.dto.InterviewQuestion;
import com.example.ai_interview_prep.model.InterviewHistory;
import com.example.ai_interview_prep.repository.InterviewHistoryRepository;
import com.example.ai_interview_prep.service.GenAiService;
import com.example.ai_interview_prep.service.ResumeParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:4200")
public class ResumeInterviewController {

    private final GenAiService genAiService;
    private final InterviewHistoryRepository historyRepo;

    public ResumeInterviewController(
            GenAiService genAiService,
            InterviewHistoryRepository historyRepo
    ) {
        this.genAiService = genAiService;
        this.historyRepo = historyRepo;
    }

    @PostMapping("/upload")
    public List<InterviewQuestion> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email
    ) throws Exception {

        String resumeText = ResumeParser.extractText(file);

        String prompt =
                "Generate EXACTLY 3 resume-based interview questions.\n" +
                        "Rules:\n" +
                        "- Question: max 1 sentence\n" +
                        "- Answer: max 4 bullet points\n" +
                        "- Return ONLY JSON array\n\n" +
                        "Format:\n" +
                        "[{\"question\":\"...\",\"answer\":\"- point1\\n- point2\"}]\n\n" +
                        "Resume:\n" + resumeText;

        String aiResponse = genAiService.generateText(prompt)
                .replace("```json", "")
                .replace("```", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();

        List<InterviewQuestion> questions =
                mapper.readValue(aiResponse,
                        new TypeReference<List<InterviewQuestion>>() {});

        // 🔥 STEP 4 – SAVE TO DATABASE
        for (InterviewQuestion q : questions) {

            InterviewHistory history = new InterviewHistory();
            history.setUserEmail(email);
            history.setType("RESUME");   // ✅ FIXED LINE
            history.setQuestion(q.getQuestion());
            history.setAnswer(q.getAnswer());
            historyRepo.save(history);
        }

        return questions;
    }
}
