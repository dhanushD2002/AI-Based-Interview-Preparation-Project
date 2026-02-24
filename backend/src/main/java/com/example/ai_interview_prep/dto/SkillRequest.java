package com.example.ai_interview_prep.dto;
import java.util.List;
public class SkillRequest {
    private List<String> skills;
    private String difficulty;

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
