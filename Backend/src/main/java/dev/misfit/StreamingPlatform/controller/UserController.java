package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.io.LoginRequest;
import dev.misfit.StreamingPlatform.io.LoginResponse;
import dev.misfit.StreamingPlatform.io.RegisterRequest;
import dev.misfit.StreamingPlatform.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public boolean register(@RequestPart("register") RegisterRequest registerRequest, @RequestPart("file") MultipartFile file) throws IOException {
        return service.addUser(registerRequest, file);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) throws Exception {
        return service.login(request);
    }
}
