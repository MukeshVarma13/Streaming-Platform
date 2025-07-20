package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.io.LoginRequest;
import dev.misfit.StreamingPlatform.io.LoginResponse;
import dev.misfit.StreamingPlatform.io.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserService {

    boolean addUser(RegisterRequest registerRequest, MultipartFile file) throws IOException;

    LoginResponse login(LoginRequest loginRequest) throws Exception;
}
