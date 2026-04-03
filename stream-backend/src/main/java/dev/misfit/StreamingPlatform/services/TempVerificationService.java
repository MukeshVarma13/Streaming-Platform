package dev.misfit.StreamingPlatform.services;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class TempVerificationService {

    private final ConcurrentHashMap<String, Long> verifiedEmails = new ConcurrentHashMap<>();

    public void markEmailVerified(String email){
        long expiry = System.currentTimeMillis() + (5 * 60 * 1000); // 5 mins
        verifiedEmails.put(email, expiry);
    }

    public boolean isEmailVerified(String email) {
        Long expiry = verifiedEmails.get(email);
        if (expiry == null || expiry < System.currentTimeMillis()) {
            verifiedEmails.remove(email);
            return false;
        }
        return true;
    }

    public void remove(String email) {
        verifiedEmails.remove(email);
    }
}
