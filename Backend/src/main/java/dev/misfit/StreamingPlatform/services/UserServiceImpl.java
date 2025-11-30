package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import dev.misfit.StreamingPlatform.customExceptions.UnauthorizedUserException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    @Value("${profile-picture.path}")
    private String profilePicPath;

    public UserServiceImpl(
            UserRepository userRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean addUser(RegisterRequest registerRequest) {
        registerRequest.setPassword(bCryptPasswordEncoder
                .encode(registerRequest.getPassword()));
        User user = convertToUser(registerRequest);

//        Path uploadDir = Path.of(profilePicPath);
//        Files.createDirectories(uploadDir);

//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//        Path filePath = uploadDir.resolve(fileName);
//
//        Files.copy(file.getInputStream(), filePath);

//        user.setProfilePic("/profile-pic/" + fileName);
        userRepository.save(user);
        return true;

    }

    private User convertToUser(RegisterRequest request) {
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .verified(true)
                .build();
    }


    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

//        Path profilePath = Path.of(profilePicPath, user.getProfilePic());

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                ));

        if (authentication.isAuthenticated()) {
            return LoginResponse.builder()
                    .token(jwtUtil.generateToken(loginRequest.getEmail(), user.getUserId()))
                    .build();
        }
        throw new UnauthorizedUserException("User unauthorized");
    }
}
