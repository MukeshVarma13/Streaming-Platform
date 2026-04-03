package dev.misfit.StreamingPlatform.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OTPService {

    private final JavaMailSender mailSender;
    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> otpExpiry = new ConcurrentHashMap<>();
    @Value("${spring.mail.username}")
    private String fromEmail;

    public OTPService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String generateOtp(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000)); // 6-digit OTP
        otpStore.put(email, otp);
        otpExpiry.put(email, System.currentTimeMillis() + 5 * 60 * 1000); // 5 min expiry
        // send mail
        String subject = "Verification Email";
        String content = "This is a verification email send by MISFITS and your OTP for registration is " + otp;
        return sendEmail(email, subject, content);
    }

    public boolean validateOtp(String email, String otp) {
        if (!otpStore.containsKey(email)) return false;
        if (otpExpiry.get(email) < System.currentTimeMillis()) {
            otpStore.remove(email);
            otpExpiry.remove(email);
            return false;
        }
        boolean isValid = otpStore.get(email).equals(otp);
        if (isValid) {
            otpStore.remove(email);
            otpExpiry.remove(email);
        }
        return isValid;
    }

    private String sendEmail(String toEmail, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
            return "Mail sent!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
