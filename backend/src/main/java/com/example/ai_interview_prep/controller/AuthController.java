package com.example.ai_interview_prep.controller;

import com.example.ai_interview_prep.model.User;
import com.example.ai_interview_prep.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // ======================
    // SIGNUP API
    // ======================
    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        Optional<User> existingUser = repo.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        repo.save(user);

        response.put("success", true);
        response.put("message", "Signup successful");
        response.put("email", user.getEmail()); // ✅ added
        return response;
    }

    // ======================
    // LOGIN API
    // ======================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        Optional<User> dbUser = repo.findByEmail(user.getEmail());

        if (dbUser.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        if (!dbUser.get().getPassword().equals(user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        // ✅ SUCCESS RESPONSE
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("email", dbUser.get().getEmail()); // 🔥 IMPORTANT
        response.put("userId", dbUser.get().getId());  // 🔥 OPTIONAL (future use)

        return response;
    }
}
