package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserService {

    boolean addUser(RegisterRequest registerRequest, MultipartFile file) throws IOException;

    LoginResponse login(LoginRequest loginRequest) throws Exception;
}
