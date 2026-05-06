package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UnauthorizedUserException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.SearchUserRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.UserService;
import dev.misfit.StreamingPlatform.utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SearchUserRepository searchUserRepository;
    private final StreamSearchRepository streamSearchRepository;
    private final JwtUtil jwtUtil;

    @Value("${profile-picture.path}")
    private String profilePicPath;

    public UserServiceImpl(
            UserRepository userRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            AuthenticationManager authenticationManager, SearchUserRepository searchUserRepository, StreamSearchRepository streamSearchRepository,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.searchUserRepository = searchUserRepository;
        this.streamSearchRepository = streamSearchRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    @Transactional
    public LoginResponse addUser(RegisterRequest registerRequest) {

        Optional<User> userExists = userRepository.findByEmailIgnoreCase(registerRequest.getEmail());

        if (userExists.isPresent()) {
            throw new UserNotFoundException("User already exists");
        }

        registerRequest.setEmail(
                registerRequest.getEmail().trim().toLowerCase()
        );
        String password = registerRequest.getPassword();

        registerRequest.setPassword(bCryptPasswordEncoder
                .encode(registerRequest.getPassword()));
        User user = convertToUser(registerRequest);
        User saved = userRepository.save(user);

        SearchUser searchUser = SearchUser.builder()
                .id(saved.getUserId())
                .profilePic(saved.getProfilePic())
                .name(saved.getName())
                .followers(saved.getFollowers().stream().map(user1 -> user1.getUserId()).collect(Collectors.toSet()))
                .followersCount(saved.getFollowers().size())
                .build();
        searchUserRepository.save(searchUser);

        return login(new LoginRequest(registerRequest.getEmail(), password));
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
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {

        loginRequest.setEmail(
                loginRequest.getEmail().trim().toLowerCase()
        );

        User user = userRepository.findByEmailIgnoreCase(loginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

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

    @Override
    @CacheEvict(value = "logged-user", key = "#userId", allEntries = true)
    @Transactional
    public void completeProfile(Long userId, MultipartFile profile, String newName) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        SearchUser searchUser = searchUserRepository.findById(user.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found in Es"));

        List<StreamSearch> streamUser = streamSearchRepository.findByStreamerId(user.getUserId());

        Path uploadDir = Path.of(profilePicPath);
        Files.createDirectories(uploadDir);
        String fileName = System.currentTimeMillis() + "_" + profile.getOriginalFilename();
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(profile.getInputStream(), filePath);
        if (newName != null) {
            user.setName(newName);
            searchUser.setName(newName);
        }

        user.setProfilePic("/profile-pic/" + fileName);
        searchUser.setProfilePic(user.getProfilePic());

        if (!streamUser.isEmpty()) {
            streamUser.stream().map(u -> {
                u.setStreamerName(newName);
                u.setStreamerProfilePic(user.getProfilePic());
                streamSearchRepository.save(u);
                return u;
            }).toList();
            log.info("Profile Updated SuccessFully!");
        }

        userRepository.save(user);
        searchUserRepository.save(searchUser);
    }
}
