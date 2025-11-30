package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.LoginRequest;
import dev.misfit.StreamingPlatform.DTO.LoginResponse;
import dev.misfit.StreamingPlatform.DTO.RegisterRequest;
import dev.misfit.StreamingPlatform.services.OTPService;
import dev.misfit.StreamingPlatform.services.TempVerificationService;
import dev.misfit.StreamingPlatform.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class UserController {

    private final UserService service;
    private final OTPService otpService;
    private final TempVerificationService verificationService;

    public UserController(UserService service, OTPService otpService, TempVerificationService verificationService) {
        this.service = service;
        this.otpService = otpService;
        this.verificationService = verificationService;
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterRequest registerRequest) {
        if (!verificationService.isEmailVerified(registerRequest.getEmail())) {
            return false;
        }
        verificationService.remove(registerRequest.getEmail());
        return service.addUser(registerRequest);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    // STEP 1: Send OTP
    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String email) {
        return otpService.generateOtp(email);
    }

    // STEP 2: Verify OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        if (!otpService.validateOtp(email, otp)) {
            return "Invalid or expired OTP.";
        }
        verificationService.markEmailVerified(email);
        return "OTP verified.";
    }
}
