package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserService {

    LoginResponse addUser(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);

    void completeProfile(Long userId, MultipartFile profile, String newName) throws IOException;
}
