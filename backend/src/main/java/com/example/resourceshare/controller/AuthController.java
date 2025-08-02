package com.example.resourceshare.controller;

import com.example.resourceshare.dto.AuthRequest;
import com.example.resourceshare.dto.UserDTO;
import com.example.resourceshare.entity.User;
import com.example.resourceshare.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody AuthRequest authRequest, HttpSession session) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            UserDTO userDTO = userService.getCurrentUser();
            return ResponseEntity.ok(userDTO);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody User user) {
        UserDTO registeredUser = userService.register(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserDTO> getCurrentUser() {
        UserDTO userDTO = userService.getCurrentUser();
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
}