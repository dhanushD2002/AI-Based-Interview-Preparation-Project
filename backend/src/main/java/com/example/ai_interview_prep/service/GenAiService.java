package com.example.ai_interview_prep.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GenAiService {

    private final Client client;

    public GenAiService() {
        // 🔑 Environment variable automatically read by SDK
        this.client = new Client();
    }

    public String generateText(String prompt) {

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );
        return response.text();
    }
}
