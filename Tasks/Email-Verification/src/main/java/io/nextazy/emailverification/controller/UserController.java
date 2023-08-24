package io.nextazy.emailverification.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private JavaMailSender emailSender;

    private Map<String, String> verificationTokens = new HashMap<>();

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        String token = generateToken();
        verificationTokens.put(token, user.getEmail());
        sendVerificationEmail(user.getEmail(), token);
        return "Signup successful! Please check your email for verification.";
    }

    @GetMapping("/verify/{token}")
    public String verifyEmail(@PathVariable String token) {
        String email = verificationTokens.get(token);
        if (email != null) {
            verificationTokens.remove(token); 
            return "Email verified successfully! You can now log in.";
        } else {
            return "Invalid verification token.";
        }
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    private void sendVerificationEmail(String toEmail, String token) {
        String verificationLink = "http://localhost:8080/verify/" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Email Verification");
        message.setText("Click the following link to verify your email: " + verificationLink);
        emailSender.send(message);
    }
}
