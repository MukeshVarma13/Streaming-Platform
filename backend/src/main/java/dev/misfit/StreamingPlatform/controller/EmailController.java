package dev.misfit.StreamingPlatform.controller;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/videos/send-email")
public class EmailController {

    private final JavaMailSender mailSender;

    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @GetMapping
    public String sendEmail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("misfit.dev.13@gmail.com");
            message.setTo("mukeshvarma7676@gmail.com");
            message.setSubject("Mail Experiment");
            message.setText("Sample email for verification!!");
            mailSender.send(message);
            return "Mail sent successfully :)";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
