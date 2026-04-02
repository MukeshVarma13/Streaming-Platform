package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    boolean addUser(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);
}
